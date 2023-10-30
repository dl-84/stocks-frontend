import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { DashboardDto } from '../dto/dashboardDto';
import { Route } from '../const/route';
import { Url } from '../const/url';

@Injectable({
    providedIn: 'root'
})
export class AppDashboardService {
    public dashboards: Array<DashboardDto> = [];

    constructor(
        private httpClient: HttpClient,
        private router: Router,
    ) { }

    /**
     * Get all.
     * 
     * Gets all stored dashboard dataset from the backend.
     * 
     * @returns Promise<any>.
     */
    getAll(): Promise<any> {
        const promise = firstValueFrom(
            this.httpClient.get(Url.dashbord))
            .then(data => {
                Object.assign(this.dashboards, data);
                return data;
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });

        return promise;
    }

    /**
     * Add.
     * 
     * Adds a new dataset of dashbord dto to the backend.
     * 
     * @param dashboard - The dashboard data they should be stored.
     */
    add(dashboard: DashboardDto): void {
        firstValueFrom(
            this.httpClient.post(Url.dashbord, dashboard))
            .then(_ => {
                this.getAll();
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    /**
     * Update.
     * 
     * Updates a dataset of dashbord dto in the backend.
     * 
     * @param dashboard - The dashboard dataset that should be updated.
     */
    update(dashboard: DashboardDto) {
        firstValueFrom(
            this.httpClient.put(Url.dashbord, dashboard))
            .then(_ => {
                this.getAll();
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    /**
     * Delete at id.
     * 
     * Delete an dashboard dataset bases on the id.
     * 
     * @param id - The dashboard id they should be deleted.
     */
    deleteAtId(id: Number): void {
        firstValueFrom(
            this.httpClient.delete(Url.dashbord + `/${id}`))
            .then(_ => {
                this.dashboards.splice(this.dashboards.findIndex(x => x.id == id), 1);
                this.getAll();
            })
            .catch(error => {
                this.router.navigate([Route.error]);
            });
    }
}