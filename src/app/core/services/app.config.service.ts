import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardPageDto } from '../dto/dashboardPageDto';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    public pages: DashboardPageDto[] = [];

    constructor(private httpClient: HttpClient) { }

    load(): void {

        this.httpClient.get(
            'http://localhost:3000/api/config',
            { observe: 'response' }
        ).subscribe(response => {
            //console.log('Success')
            console.log('Success')
        }, error => {
            // You can access status:
            console.log('Error Code:')
            console.log(error.status);
        });
    }
}