import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppFooterModule,
  AppHeaderModule,
  AppSidebarModule,
} from "@coreui/angular";
import { IconSetService } from "@coreui/icons-angular";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TabsModule } from "ngx-bootstrap/tabs";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from "ngx-perfect-scrollbar";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppComponent } from "./app.component";
// Import routing module
import { AppRoutingModule } from "./app.routing";
// Import containers
import { DefaultLayoutComponent } from "./containers";
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { AuthGuard } from "./_core/_guards/auth.guard";
import { ModelEditResolver } from "./_core/_resolvers/model-edit.resolver";
import { ModelResolver } from "./_core/_resolvers/model.resolver";
import { AlertifyService } from "./_core/_services/alertify.service";
import { AuthService } from "./_core/_services/auth.service";
import { CrossSiteSharingModule } from './views/report/cross-site-sharing/cross-site-sharing.module';
import { KaizenReportModule } from './views/report/kaizen-report/kaizen-report.module';
import { RftReportModule } from './views/report/rft-report/rft-report.module';
import { GroupRftReportModule } from './views/report/group-rft-report/group-rft-report.module';
import { GroupKaizenReportModule } from './views/report/group-kaizen-report/group-kaizen-report.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
const APP_CONTAINERS = [DefaultLayoutComponent];

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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"],
        disallowedRoutes: ["localhost:5000/api/auth"],
      },
    }),
    CrossSiteSharingModule,
    KaizenReportModule,
    RftReportModule,
    GroupRftReportModule,
    GroupKaizenReportModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
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
    IconSetService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
