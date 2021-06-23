import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { KaizenService } from '../../../../_core/_services/kaizen.service';

@Component({
  selector: 'app-kaizen-rft-edit',
  templateUrl: './kaizen-rft-edit.component.html',
  styleUrls: ['./kaizen-rft-edit.component.scss']
})
export class KaizenRftEditComponent implements OnInit {

  model_no:string="";
  serialNo:string ="";
  listdataModelNo: any;
  modelName: string ="";
  dataKaizen: any = {};
  process: string = '';
  isvideoB4 = false;
  isvideoAfter = false;
  stage: string = '';
  imgBase64Before: any = null;
  imgBase64After: any = null;
  stages: Array<Select2OptionData>;
  processList: Array<Select2OptionData>;
  Operations: Array<Select2OptionData>;
  kaizenFrom: Array<Select2OptionData>;
  urlImage: any = environment.imageUrl + "images/no-image.jpg";
  url_after: any = environment.imageUrl;
  url_before: any = environment.imageUrl;
  isLoaddata =false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _kaizenService: KaizenService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.model_no = this.route.snapshot.params['modelNo'];
    this.serialNo = this.route.snapshot.params['serial_no'];
    this.loaddata();
  }

  loaddata()
  {
    this.spinner.show();
    this._kaizenService.getKaizenEdit(this.model_no,this.serialNo).subscribe(res=>{
      this.dataKaizen = res;
      if (this.dataKaizen.before_media != "") {
        if (this.dataKaizen.before_media.split(".").pop() == "mp4" ||
          this.dataKaizen.before_media.split(".").pop() == "MP4") {
          this.isvideoB4 = true;
        }
        this.url_before = this.url_before + this.dataKaizen.before_media;
  
      }
      else {
        this.url_before = this.urlImage;
      }
      if (this.dataKaizen.after_media != "") {
        if (this.dataKaizen.after_media.split(".").pop() == "mp4" ||
          this.dataKaizen.after_media.split(".").pop() == "MP4") {
          this.isvideoAfter = true;
        }
        this.url_after = this.url_after + this.dataKaizen.after_media;
      }
      else {
        this.url_after = this.urlImage;
      }
      this.getListStage();
      this.getListModelNo();
      this.getListKaizenFrom();
      this.isLoaddata =true;
      this.spinner.hide();
    },error=>{
      this.alertify.error("Can not load Kaizen");
      this.spinner.hide();
    });
  }


  backList() {
    this.router.navigate(['/kaizen/kaizen-rft/list']);
  }

  getListModelNo() {
    this._kaizenService.geDataModelNo().subscribe(res => {
      this.listdataModelNo = res;
      this.modelName = this.listdataModelNo.find(x => x.model_no == this.dataKaizen.model_no).model_name;
    })
  }

  getListStage() {
    this._kaizenService.getDataStage().subscribe(res => {
      this.stages = res.map(item => {
        return { id: item.stage_id, text: item.stage_name };
      });
      this.getListProcess();
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

  getListOpera() {
    this._kaizenService.getOpera(this.dataKaizen.model_no, this.stage, this.process).subscribe(res => {
      this.Operations = res.map(item => {
        return { id: item.operation_id, text: item.operation_name_en };
      })
    })
  }

  getListKaizenFrom() {
    this._kaizenService.getKaizenFrom().subscribe(res => {
      this.kaizenFrom = res.map(item => {
        return { id: item.factory_id, text: item.factory_name };
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
        this.alertify.success("Update succeed");
        this.router.navigate(['/kaizen/kaizen-rft/list']);
      },
      (error) => {
        this.alertify.error(error);
      }
    );

  }

}
