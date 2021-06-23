import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { KaizenService } from '../../../../_core/_services/kaizen.service';
import { FunctionUtility } from '../../../../_core/_utility/function-utility';

@Component({
  selector: 'app-kaizen-edit',
  templateUrl: './kaizen-edit.component.html',
  styleUrls: ['./kaizen-edit.component.scss']
})
export class KaizenEditComponent implements OnInit {

  urlImage: any = environment.imageUrl + "images/no-image.jpg";
  url_after: any = environment.imageUrl;
  url_before: any = environment.imageUrl;

  model_no: string ='';
  serialNo: string ='';
  listdataModelNo: any;
  dataKaizen: any = {};
  modelName: string = "";
  stages: Array<Select2OptionData>;
  kaizenFrom: Array<Select2OptionData>;
  processList: Array<Select2OptionData>;
  Operations: Array<Select2OptionData>;
  stage: string = '';
  process: string = '';
  isvideoB4: boolean = false;
  isvideoAfter: boolean = false;
  isLoaddata =false;
  imgBase64Before: any = null;
  imgBase64After: any = null;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private kaizenService: KaizenService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private functionUtility: FunctionUtility,

  ) { }

  ngOnInit(): void {
    this.model_no = this.route.snapshot.params['modelNo'];
    this.serialNo = this.route.snapshot.params['serial_no'];
    this.loaddata();
  }

  backList() {
    this.router.navigate(['/kaizen/list']);
  }

  getListModelNo() {
    this.kaizenService.geDataModelNo().subscribe(res => {
      this.listdataModelNo = res;
      this.modelName = this.listdataModelNo.find(x => x.model_no == this.dataKaizen.model_no).model_name;
    })
  }
  getListStage() {
    this.kaizenService.getDataStage().subscribe(res => {
      this.stages = res.map(item => {
        return { id: item.stage_id, text: item.stage_name };
      });
      this.getListProcess();
    })
  }
  getListKaizenFrom() {
    this.kaizenService.getKaizenFrom().subscribe(res => {
      this.kaizenFrom = res.map(item => {
        return { id: item.factory_id, text: item.factory_name };
      })
    })
  }
  getListProcess() {
    this.kaizenService.getProcess(this.dataKaizen.model_no, this.stage).subscribe(res => {
      this.processList = res.map(item => {
        return { id: item.process_type_id, text: item.process_type_name_en };
      });
      this.getListOpera();
    })
  }
  getListOpera() {
    this.kaizenService.getOpera(this.dataKaizen.model_no, this.stage, this.process).subscribe(res => {
      this.Operations = res.map(item => {
        return { id: item.operation_id, text: item.operation_name_en };
      })
    })
  }


  loaddata()
  {
    this.spinner.show();
    this.kaizenService.getKaizenEdit(this.model_no,this.serialNo).subscribe(res=>{
      this.dataKaizen = res;
      console.log(res);
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

  onSelectFile(event, number) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      var title = event.target.files[0].name.split(".").pop();
      var fileZise = event.target.files[0].size;
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // console.log("file: ", event.target)
        if (title == "jpg" ||
          title == "jpeg" ||
          title == "png" ||
          title == "JPG" ||
          title == "JPEG" ||
          title == "PNG" ||
          title == "MP4" ||
          title == "mp4") {
          if (fileZise <= 20971200) {
            if (number === 1) {
              this.isvideoB4 = false;
              if (title == "MP4" ||
                title == "mp4") {
                this.isvideoB4 = true;
              }
              this.url_before = event.target.result;
              this.imgBase64Before = event.target.result;
            } else {
              this.isvideoAfter = false;
              if (title == "MP4" ||
                title == "mp4") {
                this.isvideoAfter = true;
              }
              this.url_after = event.target.result;
              this.imgBase64After = event.target.result;
            }
          }
          else {
            this.alertify.error("Size too big")
          }
        }
        else {
          this.alertify.error("Format error")
        }
      }
    }
  }

  save() {
    if (this.imgBase64Before != null) {
      this.dataKaizen.before_media = this.imgBase64Before;
    }
    if (this.imgBase64After != null) {
      this.dataKaizen.after_media = this.imgBase64After;
    }
    if (this.dataKaizen.kaizen_type_combine == false && this.dataKaizen.kaizen_type_eliminate == false
      && this.dataKaizen.kaizen_type_reduce == false && this.dataKaizen.kaizen_type_smart_tool == false) {
      this.alertify.error("Please Chosise Kaizen Type");
      return;
    }
    this.spinner.show();
    this.kaizenService.update(this.dataKaizen).subscribe(
      res => {
        if(res.success) {
          this.alertify.success(res.message);
          this.spinner.hide();
          this.router.navigate(['/kaizen/list']);
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

  stageChange() {
    this.stage = this.dataKaizen.stage_id;
    this.process = '';
    this.getListProcess();
  }
  processChange() {
    this.getListOpera();
  }
  changedate( event: Date)
  {
    this.dataKaizen.start_date= this.functionUtility.returnDayNotTime(event);
  }
}
