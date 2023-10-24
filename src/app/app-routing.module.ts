import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Route } from './core/const/route';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: Route.main, component: MainComponent },
  { path: Route.dashboard, component: DashboardComponent },
  { path: Route.error, component: ErrorComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
