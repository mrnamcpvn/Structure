import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Factory } from "../../../../_core/_model/factory";
import { ModelCrossSiteSharing } from "../../../../_core/_model/model-cross-site-sharing";
import { Pagination } from "../../../../_core/_model/pagination";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { CrossSiteSharingService } from "../../../../_core/_services/cross-site-sharing.service";

@Component({
  selector: "app-cross-site-sharing-list",
  templateUrl: "./cross-site-sharing-list.component.html",
  styleUrls: ["./cross-site-sharing-list.component.scss"],
})
export class CrossSiteSharingListComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  };
  factories: Factory[];
  factory: string = "";
  model_no: string = "";
  models: ModelCrossSiteSharing[] = [];
  filterParam: any;
  constructor(
    private crosssitesharingSerivce: CrossSiteSharingService,
    private spinnerService: NgxSpinnerService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllFactory();
    this.getData();
  }

  getAllFactory() {
    this.crosssitesharingSerivce.getAllFactory().subscribe((res) => {
      this.factories = res;
    });
  }

  getData() {
    this.filterParam = {
      factory_id: this.factory,
      model_No: this.model_no.toUpperCase(),
    };
    this.crosssitesharingSerivce
      .search(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.filterParam
      )
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          this.models = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.spinnerService.hide();
          this.alertify.error("Have Error");
        }
      );
  }
  search() {
    this.pagination.currentPage = 1;
    this.getData();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getData();
  }
  clear() {
    this.models.length = 0;
    this.model_no = "";
    this.factory = "";
  }
  changeChoise(item: any) {
    item.isChoise = !item.isChoise;
  }
  edit(item: any) {
    this.router.navigate([
      "/report/cross-site-sharing/Cross-detail/" +
        item.to_factory_id +
        "/" +
        item.model_no +
        "/" +
        item.serial_no,
    ]);
  }
  exportPDF() {
    let print = false;
    this.models.forEach((res) => {
      if (res.isChoise == true) {
        print = true;
      }
    });
    if (print) {
      this.crosssitesharingSerivce.changeCrossSiteSharing(this.models);
      this.router.navigate(["/report/cross-site-sharing/Cross-pdf/"]);
    }
  }
}
