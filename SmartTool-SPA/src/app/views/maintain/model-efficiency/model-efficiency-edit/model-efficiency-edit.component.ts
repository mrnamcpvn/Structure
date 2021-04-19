import { Component, OnInit } from "@angular/core";
import { Efficiency } from "../../../../_core/_models/efficiency";
import { Select2OptionData } from "ng-select2";
import { ModelEfficiencyService } from "../../../../_core/_services/model-efficiency.service";
import { CustomNgSnotifyService } from "../../../../_core/_services/snotify.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-model-efficiency-edit",
  templateUrl: "./model-efficiency-edit.component.html",
  styleUrls: ["./model-efficiency-edit.component.scss"],
})
export class ModelEfficiencyEditComponent implements OnInit {
  arrMonth: any = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
  listEfficiencys: Efficiency[];
  efficiency: any = {};
  monthEF: number;
  paramSearch: any = {};
  modelNames: any = {};
  upperList: Array<Select2OptionData>;
  inputSeason: number;
  disableUpper: boolean = true;
  disableSave: boolean = true;

  constructor(
    private modelEfficiencyService: ModelEfficiencyService,
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.listEfficiencys = [];
    this.createListModel();
  }

  createListModel() {
    this.arrMonth.forEach((element, index) => {
      let model = new Efficiency();
      if (element >= 3 && element <= 8) {
        model.season = "FW";
      } else {
        model.season = "SS";
      }
      model.month = element;
      model.sequence = index + 1;
      this.listEfficiencys.push(model);
    });
  }
  getListUpperId() {
    this.modelEfficiencyService.getUpperID().subscribe((res) => {
      this.upperList = res.map((item) => {
        return { id: item.upper_id, text: item.upper_id };
      });
    });
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

  changeSeason() {
    if (this.inputSeason > 9) {
      this.getListUpperId();
      this.disableUpper = false;
    } else {
      this.disableUpper = true;
    }
    this.resetData();
    this.paramSearch.upper_id = "";
    this.modelNames = [];
  }

  changeModelName() {
    const model_Name =
      this.paramSearch.upper_id === "all" ? "" : this.paramSearch.upper_id;
    this.modelEfficiencyService.getModelName(model_Name).subscribe((res) => {
      this.modelNames = res;
    });
  }

  changeUpperID() {
    this.getListUpperId();
    this.changeModelName();
    this.resetData();
    this.disableSave = true;
    this.paramSearch.season = "" + this.inputSeason;
    if (this.paramSearch.upper_id != "") {
      this.loadData();
      this.disableSave = false;
    }
  }

  loadData() {
    this.modelEfficiencyService.getModelEfficiency(this.paramSearch).subscribe(
      (res) => {
        this.listEfficiencys.forEach((el, i) => {
          res.forEach((r) => {
            if (r.month == el.month) {
              el.efficiency_target = r.efficiency_target;
              el.efficiency_actual = r.efficiency_actual;
              el.update_by = r.update_by;
              el.update_time = r.update_time;
              el.create_by = r.create_by;
              el.create_time = r.create_time;
            }
          });
        });
      },
      (error) => {
        this.snotify.error(error);
      }
    );
  }

  cancel() {
    this.inputSeason = null;
    this.resetData();
    this.paramSearch.upper_id = ""; 
    this.modelNames = [];
  }

  save() {
    this.listEfficiencys.forEach(element => {
      element.upper_id = this.paramSearch.upper_id;
      element.season_year = this.inputSeason.toString();
      element.update_time = "";
    });
    this.modelEfficiencyService.updateModelEfficiency(this.listEfficiencys).subscribe(
      () => {
        this.snotify.success("Edit succeed ");
        this.loadData();
      },
      (error) => {
        this.snotify.error("Can not update Model Efficiency");
      }
    );
  }

}
