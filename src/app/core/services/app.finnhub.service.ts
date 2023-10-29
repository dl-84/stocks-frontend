import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { Url } from '../const/url';
import { StockMetaDataDto } from '../dto/stockMetaDataDto';
import { Token } from '../const/token';
import { Websocket } from '../const/websocket';
import { StockLiveDataDto } from '../dto/stockLiveDataDto';


@Injectable({
    providedIn: 'root'
})
export class AppFinnhubService {
    private webSocket;

    constructor(private httpClient: HttpClient) {
        this.webSocket = webSocket(Websocket.finnhub);
    }

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

    get websocket() {
        return this.webSocket
    }
}