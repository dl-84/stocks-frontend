import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { AppDashboardService } from '../core/services/app.dashboard.service';
import { AppFinnhubService } from '../core/services/app.finnhub.service';
import { DashboardDto } from '../core/dto/dashboardDto';
import { Route } from '../core/const/route';
import { StockDto } from '../core/dto/stockDto';

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
  id: Number;
  dashboard: DashboardDto

  availableStocks: Array<StockDto>;

  filteredStocks: Array<String>;
  selectedStock: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private configService: AppDashboardService,
    private finnhubService: AppFinnhubService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      this.dashboard = this.configService.dashboards.find((value) => value.id === this.id)!;

      this.finnhubService.getAvailableStocks().then(data => { this.availableStocks = data });
    });
  }

  search(event: AutoCompleteCompleteEvent): void {
    let query = event.query;
    let filtered: Array<String> = [];

    for (let i = 0; i < (this.availableStocks as Array<StockDto>).length; i++) {

      let availableStock = (this.availableStocks as Array<StockDto>)[i].description;

      if (availableStock.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(availableStock);
      }
    }

    this.filteredStocks = filtered;
  }

  add(): void {
    let result: StockDto = this.availableStocks.find(x => x.description == this.selectedStock)!;

    console.log('');

    /*
    if (tt?.symbol) {
      this.finnhubService.open(tt.symbol);
    }

    console.log(tt);
    */
  }

  delete(): void {
  }

  get mainRoute() {
    return Route.main
  }
}




