import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppConfigService } from './services/app-config.service';
import { BaseModule } from './base/base.module';
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmtptestComponent } from './setting/smtp/smtp.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak, initConfig } from './app.initialize';
import { AppMainComponent } from './app-main/app-main.component';


@NgModule({
  declarations: [
    AppComponent,
    SmtptestComponent,
    AppMainComponent
  ],
  imports: [
    SharedModule,
    BaseModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [AppConfigService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(appConfigService:AppConfigService) {}
}
