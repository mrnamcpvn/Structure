import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { KaizenService } from '../../../../_core/_services/kaizen.service';
import { CustomNgSnotifyService } from '../../../../_core/_services/snotify.service';

@Component({
  selector: 'app-kaizen-rft-edit',
  templateUrl: './kaizen-rft-edit.component.html',
  styleUrls: ['./kaizen-rft-edit.component.scss']
})
export class KaizenRftEditComponent implements OnInit {
  urlImage: any = environment.imageUrl + "images/no-image.jpg";
  url_after: any = environment.imageUrl;
  url_before: any = environment.imageUrl;
  stages: Array<Select2OptionData>;
  processList: Array<Select2OptionData>;
  Operations: Array<Select2OptionData>;
  kaizenFrom: Array<Select2OptionData>;
  imgBase64Before: any = null;
  imgBase64After: any = null;
  dataKaizen: any = {};
  process: string = '';
  stage: string = '';
  modelName: string = "";
  listdataModelNo: any;
  isvideoB4 = false;
  isvideoAfter = false;
  model_no: string = "";
  serialNo: string = "";
  isLoaddata = false;
  constructor(
    private _kaizenService: KaizenService,
    private snotify: CustomNgSnotifyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.model_no = this.route.snapshot.params['modelNo'];
    this.serialNo = this.route.snapshot.params['serial_no'];
    this.loaddata();
  }

  loaddata() {
    this.spinner.show();
    this._kaizenService.getKaizenEdit(this.model_no, this.serialNo).subscribe(res => {
      this.dataKaizen = res;
      if (this.dataKaizen.before_media != "") {
        if (this.dataKaizen.before_media.split(".").pop() == "mp4" || this.dataKaizen.before_media.split(".").pop() == "MP4")
          this.isvideoB4 = true;
        this.url_before = this.url_before + this.dataKaizen.before_media;
      }
      else {
        this.url_before = this.urlImage;
      }
      if (this.dataKaizen.after_media != "") {
        if (this.dataKaizen.after_media.split(".").pop() == "mp4" || this.dataKaizen.after_media.split(".").pop() == "MP4")
          this.isvideoAfter = true;
        this.url_after = this.url_after + this.dataKaizen.after_media;
      }
      else {
        this.url_after = this.urlImage;
      }

      this.getListStage();
      this.getListModelNo();
      this.getListKaizenFrom();
      this.isLoaddata = true;
      this.spinner.hide();
    }, error => {
      this.snotify.error("Can not load Kaizen");
      this.spinner.hide();
    });
  }

  backList() {
    this.router.navigate(['/kaizen/kaizen-rft']);
  }
  cancel() {
    this.backList();
  }

  getListStage() {
    this._kaizenService.getDataStage().subscribe(res => {
      this.stages = res.map(item => {
        return { id: item.stage_id, text: item.stage_name };
      });
      this.getListProcess();
    })
  }
  getListKaizenFrom() {
    this._kaizenService.getKaizenFrom().subscribe(res => {
      this.kaizenFrom = res.map(item => {
        return { id: item.factory_id, text: item.factory_name };
      })
    })
  }
  getListProcess() {
    this._kaizenService.getProcess(this.dataKaizen.model_no, this.stage).subscribe(res => {
      this.processList = res.map(item => {
        return { id: item.process_type_id, text: item.process_type_name_en };
      });
      this.getListOpera();
    })
  }
  getListModelNo() {
    this._kaizenService.getDataModelNo().subscribe(res => {
      this.listdataModelNo = res;
      this.modelName = this.listdataModelNo.find(x => x.model_no == this.dataKaizen.model_no).model_name;
    })
  }
  getListOpera() {
    this._kaizenService.getOpera(this.dataKaizen.model_no, this.stage, this.process).subscribe(res => {
      this.Operations = res.map(item => {
        return { id: item.operation_id, text: item.operation_name_en };
      })
    })
  }

  save() {
    if (this.imgBase64Before != null) {
      this.dataKaizen.before_media = this.imgBase64Before;
    }
    if (this.imgBase64After != null) {
      this.dataKaizen.after_media = this.imgBase64After;
    }
    this._kaizenService.update(this.dataKaizen).subscribe(
      () => {
        this.snotify.success("Update succeed");
        this.router.navigate(['/kaizen/kaizen-rft']);
      },
      (error) => {
        this.snotify.error(error);
      }
    );

  }
}
