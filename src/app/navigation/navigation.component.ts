import { Component } from '@angular/core';

import { AppConfigService } from '../core/services/app.config.service';
import { DashboardPageDto } from '../core/dto/dashboardPageDto';
import { RouteNames } from '../core/const/routeNames';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  addNewPageDialogIsVisible: boolean = false;
  addNewPageDialogInputValue: string = '';

  constructor(private configService: AppConfigService) { }

  get numberOfPages(): number {
    let result: number = 0;

    result = this.configService.pages.length;

    return result;
  }

  get pages(): DashboardPageDto[] {
    const result: DashboardPageDto[] = [];

    for (let page of this.configService.pages) {
      result.push(page);
    }

    return result;
  }

  get pageNames(): string[] {
    const result: string[] = [];

    result.push(RouteNames.page1);
    result.push(RouteNames.page2);
    result.push(RouteNames.page3);
    result.push(RouteNames.page4);

    return result;
  }

  showDialog(): void {
    this.addNewPageDialogIsVisible = true;
  }

  save(): void {
    this.addNewPageDialogIsVisible = false;
    console.log(this.addNewPageDialogInputValue);
  }
}
