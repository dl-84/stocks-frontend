import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { Route } from '../const/route';
import { StockMetaDataDto } from '../dto/stockMetaDataDto';
import { Url } from '../const/url';

@Injectable({
    providedIn: 'root'
})
export class AppStockService {
    public stocks: Array<StockMetaDataDto>;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) { }

    /**
     * Get all stocks for dashboard.
     * 
     * Gets all stocks entries for dashboard from the backend.
     * 
     * @param dashboardId - The dashboard id
     * 
     * @returns Promise<any>.
     */
    async getAllStocksForDashboard(dashboardId: number): Promise<any> {
        this.stocks = [];

        return firstValueFrom(
            this.httpClient.get(Url.stock + `/${dashboardId}`))
            .then(data => {
                Object.assign(this.stocks, data);
                return data;
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    /**
     * Add.
     * 
     * Add an new stock dataset to the backend.
     * 
     * @param stock - The stock meta data.
     */
    add(stock: StockMetaDataDto): void {
        firstValueFrom(
            this.httpClient.post(Url.stock, stock))
            .then(_ => {
                this.getAllStocksForDashboard(stock.dashboardId);
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    /**
     * Delete by figi.
     * 
     * Delete an stock meta data set from the backend bases on the figi.
     
    * @param figi - The figi.
     * @param dashboardId - The dashboard id.
     */
    deleteByFigi(figi: String, dashboardId: number): void {
        firstValueFrom(
            this.httpClient.delete(Url.stock + `/${figi}`))
            .then(_ => {
                this.stocks.splice(this.stocks.findIndex(x => x.figi == figi), 1);
                this.getAllStocksForDashboard(dashboardId);
            })
            .catch(error => {
                console.log(error);
                this.router.navigate([Route.error]);
            });
    }

    /**
     * Delete by dashboard id.
     * 
     * Delete all stock meta data sets the had an reference to the dashboard id.
     
    * @param dashboardId - The dashboard id.
     */
    deleteByDashboardId(dashboardId: number): void {
        firstValueFrom(
            this.httpClient.delete(Url.stock + `?dashboardId=${dashboardId}`))
            .then(_ => {
                this.stocks = [];
                this.getAllStocksForDashboard(dashboardId);
            })
            .catch(error => {
                console.log(error);
                this.router.navigate([Route.error]);
            });
    }
}
