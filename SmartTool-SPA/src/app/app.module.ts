import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";
import { LoginComponent } from "./views/login/login.component";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { HighchartsChartModule } from "highcharts-angular";
import { AuthService } from './_core/_services/auth.service';

import { AuthGuard } from './_core/_guards/auth.guard'
import { HttpClientModule } from "@angular/common/http";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { ModalModule } from "ngx-bootstrap/modal";


import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { ModelResolver } from "./_core/_resolvers/model.resolver";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ModelEditResolver } from "./_core/_resolvers/model-edit.resolver";
import { environment } from "../environments/environment";
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,

    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    NgxSpinnerModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    SnotifyModule,
    HighchartsChartModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    ModelResolver,
    ModelEditResolver,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
