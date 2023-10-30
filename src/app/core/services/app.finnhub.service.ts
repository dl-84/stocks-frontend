import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

import { Url } from '../const/url';
import { StockMetaDataDto } from '../dto/stockMetaDataDto';
import { Token } from '../const/token';
import { Websocket } from '../const/websocket';


@Injectable({
    providedIn: 'root'
})
export class AppFinnhubService {
    private webSocket;

    constructor(
        private httpClient: HttpClient,
    ) {
        this.webSocket = webSocket(Websocket.finnhub);
    }

    /**
     * Get available stocks.
     * 
     * Gets all available stocks entries from finnhub.
     * 
     * @returns Promise<Array<StockMetaDataDto>>
     */
    async getAvailableStocks(): Promise<Array<StockMetaDataDto>> {
        let result: Array<StockMetaDataDto> = [];

        await firstValueFrom(
            this.httpClient.get(Url.availableStocks + `&token=${Token.finnhub}`))
            .then(data => {
                result = (data as Array<StockMetaDataDto>);
                return data;
            });

        return result;
    }

    /**
     * Websocket.
     * 
     * @returns The websocket object.
     */
    get websocket() {
        return this.webSocket
    }
}