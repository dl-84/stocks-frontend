import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { AppDashboardService } from '../core/services/app.dashboard.service';
import { AppFinnhubService } from '../core/services/app.finnhub.service';
import { AppStockService } from '../core/services/app.stock.service';
import { DashboardDto } from '../core/dto/dashboardDto';
import { Route } from '../core/const/route';
import { StockMetaDataDto } from '../core/dto/stockMetaDataDto';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public dashboard: DashboardDto;
  public filteredStocks: Array<String>;
  public selectedStock: string;

  private availableStocks: Array<StockMetaDataDto>;
  private dashboardId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: AppDashboardService,
    private stockService: AppStockService,
    private finnhubService: AppFinnhubService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.dashboardId = Number.parseInt(params['id']);
    });

    this.dashboard = this.dashboardService.dashboards
      .find((value) => value.id === this.dashboardId)!;

    this.stockService.getAllForDashboard(this.dashboardId);

    this.finnhubService.getAvailableStocks()
      .then(data => { this.availableStocks = data });
  }

  get stocks(): Array<StockMetaDataDto> {
    return this.stockService.stocks;
  }

  search(event: AutoCompleteCompleteEvent): void {
    let query = event.query;
    let filtered: Array<String> = [];

    for (let i = 0; i < (this.availableStocks as Array<StockMetaDataDto>).length; i++) {

      let availableStock = (this.availableStocks as Array<StockMetaDataDto>)[i].description;

      if (availableStock.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(availableStock);
      }
    }

    this.filteredStocks = filtered;
  }

  add(): void {
    let stock: StockMetaDataDto = this.availableStocks.find(
      x => x.description == this.selectedStock)!;

    stock.dashboardId = this.dashboardId;

    this.selectedStock = '';
    this.stockService.add(stock);
  }

  get mainRoute() {
    return Route.main
  }

  unsubscribe() {
    /*
    this.stocks.forEach(stock => {
      this.finnhubService.websocket.next({
        'type': 'unsubscribe', 'symbol': stock.symbol
      });
    });
    */

    this.finnhubService.websocket.next({
      'type': 'unsubscribe', 'symbol': 'BINANCE:BTCUSDT'
    });

    this.finnhubService.websocket.complete();
  }
}