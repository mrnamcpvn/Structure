import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { CrossSiteSharingService } from "../../../../_core/_services/cross-site-sharing.service";

@Component({
  selector: "app-cross-site-sharing-pdf-list",
  templateUrl: "./cross-site-sharing-pdf-list.component.html",
  styleUrls: ["./cross-site-sharing-pdf-list.component.scss"],
})
export class CrossSiteSharingPdfListComponent implements OnInit {
  crossSiteSharing: any;
  models: any;
  constructor(
    private spinner: NgxSpinnerService,
    private crosssitesharingSerivce: CrossSiteSharingService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.crosssitesharingSerivce.currentModel.subscribe(
      (crossSiteSharing) => (this.crossSiteSharing = crossSiteSharing)
    );
    if (this.crossSiteSharing == null || this.crossSiteSharing == undefined) {
      this.router.navigate(["/report/cross-site-sharing/main"]);
    } else {
      this.loaddata();
    }
  }
  loaddata() {
    this.crosssitesharingSerivce
      .getCrossSiteSharingPDF(this.crossSiteSharing)
      .subscribe(
        (res) => {
          this.models = res;
        },
        (error) => {
          this.alertify.error("Have Error");
        }
      );
  }
  back() {
    this.router.navigate(["/report/cross-site-sharing/main"]);
  }
}
