import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfigService } from '../core/services/app.config.service';
import { DashboardDto } from '../core/dto/dashboardDto';
import { Route } from '../core/const/route';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  addDialogIsVisible: boolean = false;
  editDialogIsVisible: boolean = false;
  errorDialogIsVisible: boolean = false;

  id: number = NaN;
  header: string = '';

  constructor(
    private configService: AppConfigService,
    private router: Router) { }

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

    this.configService.editElement({
      id: id,
      header: this.header
    });

    this.header = '';
    this.editDialogIsVisible = false;
  }

  delete(id: Number): void {
    this.configService.deleteAtIndex(id);
  }
}
