import { Component } from '@angular/core';

import { RouteNames } from '../core/const/routeNames';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  get mainRoute(): string {
    return RouteNames.main;
  }
}
