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

    constructor(private httpClient: HttpClient, private router: Router) { }

    async getAllForDashboard(dashboardId: number): Promise<any> {
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

    add(stock: StockMetaDataDto): void {
        firstValueFrom(
            this.httpClient.post(Url.stock, stock))
            .then(_ => {
                this.getAllForDashboard(stock.dashboardId);
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    deleteByFigi(figi: String, dashboardId: number): void {
        firstValueFrom(
            this.httpClient.delete(Url.stock + `/${figi}`))
            .then(_ => {
                this.stocks.splice(this.stocks.findIndex(x => x.figi == figi), 1);
                this.getAllForDashboard(dashboardId);
            })
            .catch(error => {
                console.log(error);
                this.router.navigate([Route.error]);
            });
    }

    deleteByDashboardId(dashboardId: number): void {
        firstValueFrom(
            this.httpClient.delete(Url.stock + `?dashboardId=${dashboardId}`))
            .then(_ => {
                this.stocks = [];
                this.getAllForDashboard(dashboardId);
            })
            .catch(error => {
                console.log(error);
                this.router.navigate([Route.error]);
            });
    }
}
