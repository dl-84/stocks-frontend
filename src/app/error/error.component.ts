import { Component } from '@angular/core';

import { Route } from '../core/const/route';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  get mainRoute(): string {
    return Route.main;
  }
}
