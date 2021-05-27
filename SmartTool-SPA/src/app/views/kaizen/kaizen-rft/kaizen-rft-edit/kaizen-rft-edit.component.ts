import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Select2OptionData } from "ng-select2";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../../../environments/environment";
import { AlertifyService } from "../../../../_core/_services/alertify.service";
import { KaizenService } from "../../../../_core/_services/kaizen.service";
import { FunctionUtility } from "../../../../_core/_utility/function-utility";

@Component({
  selector: "app-kaizen-rft-edit",
  templateUrl: "./kaizen-rft-edit.component.html",
  styleUrls: ["./kaizen-rft-edit.component.scss"],
})
export class KaizenRftEditComponent implements OnInit {
  _modelNo: string = "";
  modelName: string = "";
  dataKaizen: any = {};
  stage: string = "";
  process: string = "";
  serialNo: string = "";
  stages: Array<Select2OptionData>;
  Operations: Array<Select2OptionData>;
  processList: Array<Select2OptionData>;
  kaizenFrom: Array<Select2OptionData>;
  listDataModelNo: any;
  isvideoAfter = false;
  isvideoBefore = false;
  imgBase64Before: any = null;
  imgBase64After: any = null;
  urlImage: any = environment.imageUrl + "img/no-images.jpg";
  url_after: any = environment.imageUrl;
  url_before: any = environment.imageUrl;
  isLoaddata: boolean = false;
  model_no: string = "";
  constructor(
    private kaizenService: KaizenService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private functionUtility: FunctionUtility
  ) {}

  ngOnInit() {
    this.model_no = this.route.snapshot.params["modelNo"];
    this.serialNo = this.route.snapshot.params["serial_no"];
    this.loadData();
  }

  loadData() {
    this.kaizenService.getKaizenEdit(this.model_no, this.serialNo).subscribe(
      (res) => {
        this.dataKaizen = res;
        console.log(this.dataKaizen);
        if (this.dataKaizen.before_media != "") {
          if (
            this.dataKaizen.before_media.split(".").pop() == "mp4" ||
            this.dataKaizen.before_media.split(".").pop() == "MP4"
          ) {
            this.isvideoBefore = true;
          }
          this.url_before = this.url_after + this.dataKaizen.after_media;
        } else {
          this.url_before = this.urlImage;
        }
        this.getListModeNo();
        this.getListStage();
        this.getListKaizenForm();
        this.isLoaddata = true;
      },
      (error) => {
        this.alertify.error("Can not load Kaizen");
      }
    );
  }
  getListModeNo() {
    this.kaizenService.getDataModelNo().subscribe((res) => {
      this.listDataModelNo = res;
      this.modelName = this.listDataModelNo.find(
        (x) => x.model_no == this.dataKaizen.model_no
      ).model_name;
    });
  }
  getListStage() {
    this.kaizenService.getDataStage().subscribe((res) => {
      this.stages = res.map((item) => {
        return { id: item.stage_id, text: item.stage_name };
      });
      this.getListProcess();
    });
  }
  getListKaizenForm() {
    this.kaizenService.getKaizenForm().subscribe((res) => {
      this.kaizenFrom = res.map((item) => {
        return { id: item.factory_id, text: item.factory_name };
      });
    });
  }
  changeDate(event) {
    this.dataKaizen.start_date = this.functionUtility.returnDayNotTime(event);
  }

  save() {
    if (this.imgBase64After != null) {
      this.dataKaizen.after_media = this.imgBase64After;
    }
    if (this.imgBase64Before != null) {
      this.dataKaizen.before_media = this.imgBase64Before;
    }
    if (
      this.dataKaizen.kaizen_type_combine == false &&
      this.dataKaizen.kaizen_type_eliminate == false &&
      this.dataKaizen.kaizen_type_reduce == false &&
      this.dataKaizen.kaizen_type_smart_tool == false
    ) {
      this.alertify.error("Please choose Kaizen Type");
      return;
    }

    this.kaizenService.update(this.dataKaizen).subscribe(
      (res) => {
        if (res.success) {
          this.alertify.success(res.message);
          this.router.navigate(["/kaizen/kaizen/kaizen-edit"]);
        }
      },
      (error) => {
        this.alertify.error("Have error");
      }
    );
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

  onSelectFile(e, n) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      var title = e.target.files[0].name.split(".").pop();
      console.log(title);
      var fileSize = e.target.files[0].size;
      reader.onload = (e) => {
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
          if (fileSize <= 20971200) {
            if (n === 1) {
              this.isvideoBefore = false;
              if (title == "MP4" || title == "mp4") {
                this.isvideoBefore = true;
              }
              this.url_before = e.target.result;
              this.imgBase64Before = e.target.result;
            } else {
              this.isvideoAfter = false;
              if (title == "MP4" || title == "mp4") {
                this.isvideoAfter = true;
              }
              this.url_after = e.target.result;
              this.imgBase64After = e.target.result;
            }
          } else {
            this.alertify.error("Size too big");
          }
        } else {
          this.alertify.error("Format error");
        }
      };
    }
  }

  cancel() {
    this.router.navigate(["/kaizen/kaizen-list"]);
  }

  processChange() {
    this.getListOpera();
  }

  getListOpera() {
    this.kaizenService
      .getOpera(this._modelNo, this.stage, this.process)
      .subscribe((res) => {
        this.Operations = res.map((item) => {
          return { id: item.operation_id, text: item.operation_name_en };
        });
      });
  }

  backList() {
    this.router.navigate(["/kaizen/kaizen-list"]);
  }
}
