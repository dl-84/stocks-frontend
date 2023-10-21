import { Component } from '@angular/core';

import { AppConfigService } from '../core/services/app.config.service';
import { RouteNames } from '../core/const/routeNames';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component {
  active: boolean;
  header: String;

  constructor(private configService: AppConfigService) {
    if (configService.pages.length > 2) {
      this.active = true;
      this.header = configService.pages[2].header;
    } else {
      this.active = false;
      this.header = '';
    }
  }

  get mainRoute() {
    return RouteNames.main
  }
}
