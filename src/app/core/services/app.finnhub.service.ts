import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { Url } from '../const/url';
import { StockDto } from '../dto/stockDto';

@Injectable({
    providedIn: 'root'
})
export class AppFinnhubService {
    private socket: WebSocket;
    private token: String = 'cksd94hr01qstsqtbn50cksd94hr01qstsqtbn5g';


    constructor(private httpClient: HttpClient) {
        this.socket = new WebSocket('wss://ws.finnhub.io?token=cksd94hr01qstsqtbn50cksd94hr01qstsqtbn5g');
    }

    async getAvailableStocks(): Promise<Array<StockDto>> {
        let result: Array<StockDto> = [];

        await firstValueFrom(
            this.httpClient.get(Url.availableStocks + `&token=${this.token}`))
            .then(data => {
                result = (data as Array<StockDto>);
                return data;
            });

        return result;
    }

    open(symbol: string) {
        this.socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));

        this.socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

    }

    close() {
        this.socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': 'BINANCE:BTCUSDT' }));
    }

    getStockCandles(): void {

    }

}