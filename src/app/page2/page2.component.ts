import { Component } from '@angular/core';

import { AppConfigService } from '../core/services/app.config.service';
import { RouteNames } from '../core/const/routeNames';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component {
  active: boolean;
  header: String;

  constructor(private configService: AppConfigService) {
    if (configService.pages.length > 1) {
      this.active = true;
      this.header = configService.pages[1].header;
    } else {
      this.active = false;
      this.header = '';
    }
  }

  get mainRoute() {
    return RouteNames.main
  }
}
