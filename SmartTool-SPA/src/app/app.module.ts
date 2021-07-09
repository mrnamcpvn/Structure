import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
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
import { HttpClientModule } from "@angular/common/http";
import { AlertifyService } from "./_core/_services/alertify.service";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ModelResolver } from "./_core/_resolvers/model.resolver";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./_core/_services/auth.service";
import { AuthGuard } from "./_core/_guards/auth.guard";
import { JwtModule } from "@auth0/angular-jwt";
import { ModalModule } from "ngx-bootstrap/modal";

import { ModelEditResolver } from "./_core/_resolvers/model-edit.resolver";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { HighchartsChartModule } from "highcharts-angular";

export function tokenGetter() {
  return localStorage.getItem("tokenSmartTooling");
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
    HighchartsChartModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5003"],
        disallowedRoutes: ["localhost:5003/api/auth"],
      },
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    P404Component,
    P500Component,
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertifyService,
    ModelResolver,
    ModelEditResolver,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
