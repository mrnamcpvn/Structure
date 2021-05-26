import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../../../environments/environment";
import { Kaizen } from "../../../../_core/_model/kaizen";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { KaizenService } from "./../../../../_core/_services/kaizen.service";

@Component({
  selector: "app-kaizen-add",
  templateUrl: "./kaizen-add.component.html",
  styleUrls: ["./kaizen-add.component.scss"],
})
export class KaizenAddComponent implements OnInit {
  _modelNo: string;
  _modelName: string;
  dataKaizen = new Kaizen();
  stage: string = "";
  process: string = "";
  stages: Array<Select2OptionData>;
  Operations: Array<Select2OptionData>;
  processList: Array<Select2OptionData>;
  kaizenFrom: Array<Select2OptionData>;
  isvideoAfter = false;
  isvideoBefore = false;
  imgBase64Before: any = null;
  imgBase64After: any = null;
  urlImage: any = environment.imageUrl + "img/no-images.jpg";
  url_after: any = environment.imageUrl + "img/no-images.jpg";
  url_before: any = environment.imageUrl + "img/no-images.jpg";
  constructor(
    private kaizenService: KaizenService,
    private router: Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.kaizenService.modelNameSource.subscribe((modelName) => {
      this._modelName = modelName;
    });
    this.kaizenService.modelNoSource.subscribe((modelNo) => {
      this._modelNo = modelNo;
    });
    this.getListStages();
    this.getListKaizenForm();
  }
  saveAndNext() {
    this.setData();
    if (
      this.dataKaizen.kaizen_type_combine == false &&
      this.dataKaizen.kaizen_type_eliminate == false &&
      this.dataKaizen.kaizen_type_reduce == false &&
      this.dataKaizen.kaizen_type_smart_tool == false
    ) {
      this.alertify.error("Please choose Kaizen Type");
      return;
    }
    this.kaizenService.create(this.dataKaizen).subscribe(
      (res) => {
        if (res.success) {
          this.alertify.success(res.message);
          this.dataKaizen = new Kaizen();
          this.stage = "";
          this.process = "";
          this.url_before = this.urlImage;
          this.url_after = this.urlImage;
          this.spinner.hide();
        } else {
          this.alertify.error(res.message);
          this.spinner.hide();
          return;
        }
      },
      (error) => {
        this.alertify.error(error);
        this.spinner.hide();
      }
    );
  }

  getListStages() {
    this.kaizenService.getDataStage().subscribe((res) => {
      this.stages = res.map((item) => {
        return { id: item.stage_id, text: item.stage_name };
      });
    });
  }
  getListKaizenForm() {
    this.kaizenService.getKaizenForm().subscribe((res) => {
      this.kaizenFrom = res.map((item) => {
        console.log(item);
        return { id: item.factory_id, text: item.factory_name };
      });
    });

    this.dataKaizen.kaizen_from = "";
  }
  stageChange() {
    this.stage = this.dataKaizen.stage_id;
    this.process = "";
    this.getListProcess();
  }
  getListProcess() {
    this.kaizenService
      .getProcess(this._modelNo, this.stage)
      .subscribe((res) => {
        this.processList = res.map((item) => {
          return { id: item.process_type_id, text: item.process_type_name_en };
        });
        this.getListOpera();
      });
  }
  getListOpera() {
    this.kaizenService
      .getOpera(this._modelNo, this.stage, this.process)
      .subscribe((res) => {
        this.Operations = res.map((item) => {
          return { id: item.operation_id, text: item.operation_name_en };
        });
        this.dataKaizen.operation_id = "";
      });
  }

  onSelectFile(e, n) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      var title = e.target.files[0].name.split(".").pop();
      console.log(title);
      var fileSize = e.target.files[0].size;
      if (
        title == "jpg" ||
        title == "jpeg" ||
        title == "png" ||
        title == "JPG" ||
        title == "JPEG" ||
        title == "PNG" ||
        title == "MP4" ||
        title == "mp4"
      ) {
        if (fileSize < 20971200) {
          if (n === 1) {
            this.isvideoBefore = false;
            if (title == "MP4" || title == "mp4") {
              this.isvideoBefore = true;
            }
            this.url_before = e.target.result;
            this.imgBase64After = e.target.result;
          }
        } else {
          this.alertify.error("Size too big");
        }
      } else {
        this.alertify.error("Format error");
      }
    }
  }
  save() {
    this.setData();
    if (
      this.dataKaizen.kaizen_type_combine == false &&
      this.dataKaizen.kaizen_type_eliminate == false &&
      this.dataKaizen.kaizen_type_reduce == false &&
      this.dataKaizen.kaizen_type_smart_tool == false
    ) {
      this.alertify.error("Please choose Kaizen Type");
      return;
    }
    console.log(this.dataKaizen);

    this.kaizenService.create(this.dataKaizen).subscribe(
      (res) => {
        if (res.success) {
          this.alertify.success(res.message);
          this.router.navigate(["/kaizen/kaizen/"]);
        }
      },
      (error) => {
        this.alertify.error("Have error");
      }
    );
  }

  setData() {
    this.dataKaizen.model_no = this._modelNo;
    this.dataKaizen.before_media = this.imgBase64Before;
    this.dataKaizen.after_media = this.imgBase64After;
    this.dataKaizen.clicks_times = 0;
    this.dataKaizen.factory_id = "";
    this.dataKaizen.kaizen_type_combine =
      this.dataKaizen.kaizen_type_combine == undefined
        ? false
        : this.dataKaizen.kaizen_type_combine;
    this.dataKaizen.kaizen_type_eliminate =
      this.dataKaizen.kaizen_type_eliminate == undefined
        ? false
        : this.dataKaizen.kaizen_type_eliminate;
    this.dataKaizen.kaizen_type_reduce =
      this.dataKaizen.kaizen_type_reduce == undefined
        ? false
        : this.dataKaizen.kaizen_type_reduce;
    this.dataKaizen.kaizen_type_smart_tool =
      this.dataKaizen.kaizen_type_smart_tool == undefined
        ? false
        : this.dataKaizen.kaizen_type_smart_tool;
  }
  cancel() {
    this.dataKaizen = new Kaizen();
    this.stage = "";
    this.process = "";
    this.url_after = this.urlImage;
    this.url_before = this.urlImage;
  }
  processChange() {
    this.getListOpera();
  }
  backList() {
    this.router.navigate(["/kaizen/kaizen-list"]);
  }
}
