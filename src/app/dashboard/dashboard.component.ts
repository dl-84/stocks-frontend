import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '../core/const/route';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  index: Number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.index = params['index'];
    });
  }

  get mainRoute() {
    return Route.main
  }
}
