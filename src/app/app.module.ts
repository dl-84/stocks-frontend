import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ChartModule } from 'angular-highcharts';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { AppDashboardService } from './core/services/app.dashboard.service';

import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { StockViewComponent } from './stock-view/stock-view.component';

export function appConfigInit(appDashboardService: AppDashboardService) {
  return () => {
    return appDashboardService.getAll()
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    DashboardComponent,
    MainComponent,
    LineChartComponent,
    StockViewComponent,
  ],
  imports: [
    AutoCompleteModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    ChartModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    PanelModule,
    TableModule,
    ToolbarModule
  ],
  providers: [
    AppDashboardService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      multi: true,
      deps: [AppDashboardService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
