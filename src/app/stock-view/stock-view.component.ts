import { Component, ElementRef, Input } from '@angular/core';

import { AppFinnhubService } from '../core/services/app.finnhub.service';
import { AppStockService } from '../core/services/app.stock.service';
import { StockDisplayDataDto } from '../core/dto/stockDisplayDataDto';
import { StockLiveDataDto } from '../core/dto/stockLiveDataDto';
import { StockMetaDataDto } from '../core/dto/stockMetaDataDto';


@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.scss']
})
export class StockViewComponent {
  @Input() stock: StockMetaDataDto;

  public stockDisplayData: Array<StockDisplayDataDto> = [];
  public stockDisplayDataForTable: Array<StockDisplayDataDto> = [];

  private startTimestampForTableCalculation: Date;

  constructor(
    public chartElem: ElementRef,
    private stockService: AppStockService,
    private finnhubService: AppFinnhubService,) { }

  ngOnInit() {
    this.subscribe();
    this.startTimestampForTableCalculation = new Date();
  }

  delete(figi: string, dashboardId: number, symbol: string) {
    this.finnhubService.websocket.next({
      'type': 'subscribe', 'symbol': symbol
    });

    this.stockService.deleteByFigi(figi, dashboardId);
  }

  private subscribe() {
    this.finnhubService.websocket.next({
      'type': 'subscribe', 'symbol': this.stock.symbol
    });

    this.finnhubService.websocket.subscribe({
      next: data => {
        const response: StockLiveDataDto = (data as StockLiveDataDto);

        if (response.type === 'trade') {
          response.data.map(content => {
            if (content.s === this.stock.symbol) {
              this.stockDisplayData = [
                ...this.stockDisplayData, {
                  timestamp: content.t, price: content.p
                }
              ]

              this.calculateTableData();
            }
          });
        }
      },
      error: error => {
        // Todo: implement
      },
      complete: () => {
        // Todo: implement
      },
    });
  }

  private calculateTableData() {
    const lastStockData: StockDisplayDataDto =
      this.stockDisplayData[this.stockDisplayData.length - 1];

    const timespan: number =
      (new Date(lastStockData.timestamp).getTime()
        - this.startTimestampForTableCalculation.getTime()) / 1000;

    if (this.stockDisplayDataForTable === undefined ||
      this.stockDisplayDataForTable.length === 0) {
      this.stockDisplayDataForTable[0] = lastStockData;
    }

    if (timespan > 10) {
      this.stockDisplayDataForTable = [...this.stockDisplayDataForTable];

      this.startTimestampForTableCalculation = new Date(lastStockData.timestamp);

      this.stockDisplayDataForTable[2] = this.stockDisplayDataForTable[1];
      this.stockDisplayDataForTable[1] = this.stockDisplayDataForTable[0];
      this.stockDisplayDataForTable[0] = lastStockData;
    }
  };
}