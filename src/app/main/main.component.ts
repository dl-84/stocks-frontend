import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppDashboardService } from '../core/services/app.dashboard.service';
import { AppStockService } from '../core/services/app.stock.service';
import { DashboardDto } from '../core/dto/dashboardDto';
import { Route } from '../core/const/route';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public addDialogIsVisible: boolean = false;
  public editDialogIsVisible: boolean = false;
  public errorDialogIsVisible: boolean = false;

  public id: number = NaN;
  public header: string = '';

  constructor(
    private configService: AppDashboardService,
    private router: Router,
    private stockService: AppStockService,
  ) { }

  get dashboards(): Array<DashboardDto> {
    return this.configService.dashboards;
  }

  showAddDialog(): void {
    this.addDialogIsVisible = true;
  }

  showEditDialog(dashboard: DashboardDto): void {
    this.id = dashboard.id;
    this.header = dashboard.header
    this.editDialogIsVisible = true;
  }

  add(): void {
    if (!this.header) {
      this.errorDialogIsVisible = true;
      return;
    }

    this.addDialogIsVisible = false;


    this.configService.add({
      id: NaN,
      header: this.header,
    });

  }

  open(id: Number): void {
    this.router.navigate(
      [Route.dashboard],
      {
        queryParams: { id: id }
      });
  }

  edit(id: number): void {
    if (!this.header) {
      this.errorDialogIsVisible = true;
      return;
    }

    this.configService.update({
      id: id,
      header: this.header
    });

    this.header = '';
    this.editDialogIsVisible = false;
  }

  delete(id: number): void {
    this.stockService.deleteByDashboardId(id);
    this.configService.deleteAtId(id);
  }
}
