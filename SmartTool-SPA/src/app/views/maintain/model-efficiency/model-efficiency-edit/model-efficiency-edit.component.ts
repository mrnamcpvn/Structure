import { AlertUtilityService } from './../../../../_core/_services/alertUtility.service';
import { ModelEfficiencyService } from './../../../../_core/_services/model-efficiency.service';
import { Efficiency } from './../../../../_core/_models/efficiency';
import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-model-efficiency-edit',
  templateUrl: './model-efficiency-edit.component.html',
  styleUrls: ['./model-efficiency-edit.component.scss']
})
export class ModelEfficiencyEditComponent implements OnInit {

  arrayMonth: any = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
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
    private alertUtility: AlertUtilityService,
  ) { }

  ngOnInit() {
    this.listEfficiencys = [];
    this.listModel();
  }

  listModel() {
    this.arrayMonth.forEach((element, index) => {
      const model = new Efficiency;
      if (element >= 3 && element <= 8) {
        model.season = 'FW';
      } else {
        model.season = 'SS';
      }
      model.month = element;
      model.sequence = index + 1;
      this.listEfficiencys.push(model);
    });
  }

  getListUpperID() {
    this.modelEfficiencyService.getUpperID().subscribe(res => {
      this.upperList = res.map(item => {
        return {id: item.upper_id, text: item.upper_id};
      });
    });
  }

  changeSeason() {
    if (this.inputSeason > 9) {
      this.getListUpperID();
      this.disableUpper = false;
    } else {
      this.disableUpper = true;
    }
    this.resetData();
    this.paramSearch.upper_id = '';
    this.modelNames = [];
  }

  resetData() {
    this.listEfficiencys.forEach(element => {
      element.efficiency_target = null;
      element.efficiency_actual = null;
      element.update_by = null;
      element.create_time = null;
    });
    this.disableSave = true;
  }

  changeUpperID() {
    this.getListUpperID();
    this.changeModelName();
    this.resetData();
    this.disableSave = true;
    this.paramSearch.season = '' + this.inputSeason;
    if (this.paramSearch.upper_id !== '') {
      this.loadData();
      this.disableSave = false;
    }
  }

  loadData() {
    this.modelEfficiencyService.getModelEfficiency(this.paramSearch).subscribe((res) => {
      this.listEfficiencys.forEach((element, i) => {res.forEach(res_1 => {
        if (res_1.month === element.month) {
          element.efficiency_target = res_1.efficiency_target;
          element.efficiency_actual = res_1.efficiency_actual;
          element.update_by = res_1.update_by;
          element.update_time = res_1.update_time;
          element.create_by = res_1.create_by;
          element.create_time = res_1.create_time;
        }
      });
    });
    }, error => {
      this.alertUtility.error(error, 'Error');
    });
  }

  changeModelName() {
    const model_Name = this.paramSearch.upper_id === 'all' ? '' : this.paramSearch.upper_id;
    this.modelEfficiencyService.getModelName(model_Name).subscribe((res) => {
      this.modelNames = res;
    });
  }

  save() {
    this.listEfficiencys.forEach(element => {
      element.upper_id = this.paramSearch.upper_id;
      element.season_year = this.paramSearch.season_year;
      element.update_time = '';
    });
    this.modelEfficiencyService.updateModelEfficiency(this.listEfficiencys).subscribe((res) => {
      this.alertUtility.success('Edit Success', 'Success');
      this.loadData();
    }, error => {
      this.alertUtility.error('Can not update Model Efficiency', 'Error');
    });
  }

  cancel() {
    this.inputSeason = null;
    this.resetData();
    this.paramSearch.upper_id = '';
    this.modelNames = [];
  }

}
