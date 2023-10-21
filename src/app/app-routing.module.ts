import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteNames } from './core/const/routeNames';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';


const routes: Routes = [
  { path: RouteNames.main, component: MainComponent },
  { path: RouteNames.page1, component: Page1Component },
  { path: RouteNames.page2, component: Page2Component },
  { path: RouteNames.page3, component: Page3Component },
  { path: RouteNames.page4, component: Page4Component },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
