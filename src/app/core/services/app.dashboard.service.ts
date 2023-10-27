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

    constructor(private httpClient: HttpClient, private router: Router) { }

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

    updateElement(dashboard: DashboardDto) {
        firstValueFrom(
            this.httpClient.put(Url.dashbord, dashboard))
            .then(_ => {
                this.getAll();
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    deleteAtIndex(id: Number): void {
        firstValueFrom(
            this.httpClient.delete(Url.dashbord + `/${id}`))
            .then(_ => {
                this.dashboards.splice(this.dashboards.findIndex(x => x.id == id), 1);
                this.getAll();
            })
            .catch(error => {
                console.log(error);
                this.router.navigate([Route.error]);
            });
    }
}