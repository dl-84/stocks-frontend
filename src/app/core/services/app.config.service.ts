import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardDto } from '../dto/dashboardDto';
import { Route } from '../const/route';
import { Url } from '../const/url';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    public pages: Array<DashboardDto> = [];

    constructor(private httpClient: HttpClient, private router: Router) { }

    async load(): Promise<any> {
        const promise = firstValueFrom(
            this.httpClient.get(Url.config))
            .then(data => {
                Object.assign(this.pages, data);
                return data;
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });

        return promise;

    }

    add(dashboard: DashboardDto): void {
        firstValueFrom(
            this.httpClient.post(Url.config, dashboard))
            .then(_ => {
                this.load();
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    editElement(dashboard: DashboardDto) {
        firstValueFrom(
            this.httpClient.put(Url.config + `/${dashboard.id}`, dashboard))
            .then(_ => {
                this.load();
            })
            .catch(_ => {
                this.router.navigate([Route.error]);
            });
    }

    deleteAtIndex(id: Number): void {
        firstValueFrom(
            this.httpClient.delete(Url.config + `/${id}`))
            .then(_ => {
                //this.pages.splice(id);
                this.load();
            })
            .catch(error => {
                console.log(error);
                this.router.navigate([Route.error]);
            });
    }
}