import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { AppConfigService } from './core/services/app.config.service';

import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Page1Component } from './page1/page1.component';
import { ErrorComponent } from './error/error.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';

export function appConfigInit(appConfigService: AppConfigService) {
  return () => {
    return appConfigService.load()
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    Page1Component,
    ErrorComponent,
    Page2Component,
    Page3Component,
    Page4Component,
  ],
  imports: [
    AccordionModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    PanelModule,
    AppRoutingModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
