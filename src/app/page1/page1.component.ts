import { Component } from '@angular/core';

import { AppConfigService } from '../core/services/app.config.service';
import { RouteNames } from '../core/const/routeNames';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component {
  active: boolean;
  header: String;

  constructor(private configService: AppConfigService) {
    if (configService.pages.length > 0) {
      this.active = true;
      this.header = configService.pages[0].header;
    } else {
      this.active = false;
      this.header = '';
    }
  }

  get mainRoute() {
    return RouteNames.main
  }
}
