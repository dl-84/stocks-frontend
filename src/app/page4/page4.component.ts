import { Component } from '@angular/core';

import { AppConfigService } from '../core/services/app.config.service';
import { RouteNames } from '../core/const/routeNames';


@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.scss']
})
export class Page4Component {
  active: boolean;
  header: String;

  constructor(private configService: AppConfigService) {
    if (configService.pages.length > 3) {
      this.active = true;
      this.header = configService.pages[3].header;
    } else {
      this.active = false;
      this.header = '';
    }
  }

  get mainRoute() {
    return RouteNames.main
  }
}
