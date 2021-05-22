import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { Efficiency } from "../../../../_core/_model/efficiency";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { ModelEfficiencyService } from "./../../../../_core/_services/model-efficiency.service";

@Component({
  selector: "app-model-efficiency-edit",
  templateUrl: "./model-efficiency-edit.component.html",
  styleUrls: ["./model-efficiency-edit.component.scss"],
})
export class ModelEfficiencyEditComponent implements OnInit {
  arrMonth = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
  paramSearch: any = {};
  listEfficiencys: Efficiency[];
  disableUpper: boolean = true;
  disableSave: boolean = true;
  inputSeason: any = {};
  modelNames: any = {};
  upperList: Array<Select2OptionData>;
  constructor(
    private router: Router,
    private modelEfficiencyService: ModelEfficiencyService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.createListModel();
    this.listEfficiencys = [];
  }

  loadData() {
    this.modelEfficiencyService.getModelEfficiency(this.paramSearch).subscribe(
      (res) => {
        this.listEfficiencys.forEach((item) => {
          res.forEach((r) => {
            if (r.month == item.month) {
              item.efficiency_actual = r.efficiency_actual;
              item.efficiency_target = r.efficiency_target;
              item.update_by = r.update_by;
              item.update_time = r.update_time;
              item.create_by = r.create_by;
              item.create_time = r.created_time;
            }
          });
        });
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  createListModel() {
    this.arrMonth.forEach((el, i) => {
      let model = new Efficiency();
      if (el >= 3 && el <= 8) {
        model.season = "FW";
      } else {
        model.season = "SS";
      }
      model.month = el;
      model.sequence = i + 1;
      this.listEfficiencys.push(model);
    });
  }
  getListUpperId() {
    this.modelEfficiencyService.getUpperId().subscribe((res) => {
      this.upperList = res.map((item) => {
        return { id: item.upper_id, texr: item.upper_id };
      });
    });
  }
  changeSeason() {
    if (this.inputSeason > 9) {
      this.getListUpperId();
      this.disableUpper = false;
    } else {
      this.disableUpper = true;
    }
  }
  //thay đổi upper id
  changeUpperID() {
    this.getListUpperId();
    this.changeModelName();
    this.resetData();
    this.disableSave = true;
    this.paramSearch.season = "" + this.inputSeason;
    if (this.paramSearch.upper_id != 0) {
      this.loadData();
      this.disableSave = false;
    }
  }
  //thay đổi model name
  changeModelName() {
    const modelName =
      this.paramSearch.upper_id === "all" ? "" : this.paramSearch.upper_id;
    this.modelEfficiencyService.getModelName(modelName).subscribe((res) => {
      this.modelNames = res;
    });
  }

  save() {
    this.listEfficiencys.forEach((el) => {
      el.upper_id = this.paramSearch.upper_id;
      el.season_year = this.inputSeason;
      el.create_time = "";
    });

    this.modelEfficiencyService
      .updateModelEfficiency(this.listEfficiencys)
      .subscribe(
        () => {
          this.alertify.success("Edit succed!");
          this.loadData();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  resetData() {
    this.listEfficiencys.forEach((element) => {
      element.efficiency_target = null;
      element.efficiency_actual = null;
      element.update_by = null;
      element.update_time = null;
    });
    this.disableSave = true;
  }
  cancel() {
    this.inputSeason = null;
    this.resetData();
    this.paramSearch.upper_id = "";
    this.modelNames = [];
  }
}
