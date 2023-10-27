import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { AppDashboardService } from '../core/services/app.dashboard.service';
import { AppFinnhubService } from '../core/services/app.finnhub.service';
import { AppStockService } from '../core/services/app.stock.service';
import { DashboardDto } from '../core/dto/dashboardDto';
import { Route } from '../core/const/route';
import { StockMetaDataDto } from '../core/dto/stockMetaDataDto';
import { StockLiveDataDto } from '../core/dto/stockLiveDataDto';

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
  private id: number;
  dashboard: DashboardDto;

  private availableStocks: Array<StockMetaDataDto>;

  filteredStocks: Array<String>;
  selectedStock: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: AppDashboardService,
    private stockService: AppStockService,
    private finnhubService: AppFinnhubService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });

    this.dashboard = this.dashboardService.dashboards
      .find((value) => value.id === this.id)!;

    this.stockService.getAllForDashboard(this.id)
      .then(data => {
        (data as Array<StockLiveDataDto>)
          .forEach(x => this.finnhubService.open(x.symbol))
      });

    this.finnhubService.getAvailableStocks()
      .then(data => { this.availableStocks = data });

    this.finnhubService.connectExisting();
  }

  get stocks(): Array<StockMetaDataDto> {
    return this.stockService.stocks;
  }

  get liveData(): Array<StockLiveDataDto> {
    return [
      { symbol: 'AAPL', timestamp: 1262300400, lastPrice: 7210.89 },
      { symbol: 'AAPL', timestamp: 1262559600, lastPrice: 7230.89 },
      { symbol: 'AAPL', timestamp: 1262646000, lastPrice: 7250.89 },
      { symbol: 'AAPL', timestamp: 1262732400, lastPrice: 7270.89 },
      { symbol: 'AAPL', timestamp: 1262818800, lastPrice: 7890.89 },
      { symbol: 'AAPL', timestamp: 1262818800, lastPrice: 7810.89 },
    ]
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

    stock.dashboardId = this.id;

    this.selectedStock = '';
    this.stockService.add(stock);
  }

  delete(): void {
  }

  get mainRoute() {
    return Route.main
  }
}




