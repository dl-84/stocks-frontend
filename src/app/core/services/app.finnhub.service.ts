import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { WebSocket } from 'ws';

import { Url } from '../const/url';
import { StockMetaDataDto } from '../dto/stockMetaDataDto';


@Injectable({
    providedIn: 'root'
})
export class AppFinnhubService {
    private webSocket: WebSocket;
    private token: String = 'cksd94hr01qstsqtbn50cksd94hr01qstsqtbn5g';

    constructor(private httpClient: HttpClient) {
        this.webSocket = new WebSocket('wss://ws.finnhub.io?token=cksd94hr01qstsqtbn50cksd94hr01qstsqtbn5g');
    }

    async getAvailableStocks(): Promise<Array<StockMetaDataDto>> {
        let result: Array<StockMetaDataDto> = [];

        await firstValueFrom(
            this.httpClient.get(Url.availableStocks + `&token=${this.token}`))
            .then(data => {
                result = (data as Array<StockMetaDataDto>);
                return data;
            });

        return result;
    }

    connectExisting(): void {

    }

    open(symbol: string) {
        /*
        this.socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AMZN' }));

        this.socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

        console.log('sepp');
        */


    }



    close() {
        // this.socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': 'BINANCE:BTCUSDT' }));
    }
}