import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { Kaizen } from '../../../../_core/_models/kaizen';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { KaizenService } from '../../../../_core/_services/kaizen.service';

@Component({
  selector: 'app-kaizen-add',
  templateUrl: './kaizen-add.component.html',
  styleUrls: ['./kaizen-add.component.scss']
})
export class KaizenAddComponent implements OnInit {

  modelName: string;
  Model_no: string;
  stage: string = '';
  process: string ='';
  kaizenFrom: Array<Select2OptionData>;
  stages: Array<Select2OptionData>;
  processList : Array<Select2OptionData>;
  Operations: Array<Select2OptionData>;
  dataKaizen = new Kaizen;
  isvideoB4 = false;
  isvideoAfter = false;
  urlImage: any = environment.imageUrl + "images/no-image.jpg";
  url_after: any = environment.imageUrl + "images/no-image.jpg";
  url_before: any = environment.imageUrl + "images/no-image.jpg";
  imgBase64Before: any = null;
  imgBase64After: any = null;
  constructor(
    private kaizenService : KaizenService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.kaizenService.modelNameSource.subscribe((modelName) => (this.modelName = modelName));
    this.kaizenService.modelNoSource.subscribe((modelno) => (this.Model_no = modelno));
    this.getStage();
    this.getListKaizenFrom();
    
  }

  getListKaizenFrom() {
    this.kaizenService.getKaizenFrom().subscribe(res => {
      this.kaizenFrom = res.map(item => {
        return { id: item.factory_id, text: item.factory_name };
      });
      this.dataKaizen.kaizen_from = '';
    })
  }

  getStage() {
    this.kaizenService.getDataStage().subscribe(res => {
      this.stages = res.map(item => {
        return { id: item.stage_id, text: item.stage_name };
      });
      this.dataKaizen.stage_id = '';
      this.getListProcess();
    })
  }
  getListProcess(){
    this.kaizenService.getProcess(this.Model_no, this.stage).subscribe(res => {
      this.processList = res.map(item => {
        return { id: item.process_type_id, text: item.process_type_name_en };
      });
      this.getListOpera();
    })
  }
  getListOpera(){
    this.kaizenService.getOpera(this.Model_no, this.stage, this.process).subscribe(res => {
      this.Operations = res.map(item => {
        return { id: item.operation_id, text: item.operation_name_en };
      });
      this.dataKaizen.operation_id = '';
    })
  }

  backList() {
    this.router.navigate(['/kaizen/list']);
  }

  cancel() {
    this.dataKaizen = new Kaizen;
    this.stage = '';
    this.process = '';
    this.url_after = this.urlImage;
    this.url_before = this.urlImage;
  }


  setData() {
    this.dataKaizen.model_no = this.Model_no;
    this.dataKaizen.before_media = this.imgBase64Before;
    this.dataKaizen.after_media = this.imgBase64After;
    this.dataKaizen.clicks_times = 0;
    this.dataKaizen.factory_id = "";
    this.dataKaizen.kaizen_type_combine = this.dataKaizen.kaizen_type_combine == undefined?false:this.dataKaizen.kaizen_type_combine;
    this.dataKaizen.kaizen_type_eliminate = this.dataKaizen.kaizen_type_eliminate ==undefined?false:this.dataKaizen.kaizen_type_eliminate;
    this.dataKaizen.kaizen_type_reduce = this.dataKaizen.kaizen_type_reduce== undefined?false:this.dataKaizen.kaizen_type_reduce;
    this.dataKaizen.kaizen_type_smart_tool = this.dataKaizen.kaizen_type_smart_tool== undefined?false:this.dataKaizen.kaizen_type_smart_tool;
  }

  save() {
    this.setData();
    if (this.dataKaizen.kaizen_type_combine == false && this.dataKaizen.kaizen_type_eliminate == false
      && this.dataKaizen.kaizen_type_reduce == false && this.dataKaizen.kaizen_type_smart_tool == false) {
      this.alertify.error("Please Chosise Kaizen Type");
      return;
    }
    this.spinner.show();
    this.kaizenService.create(this.dataKaizen).subscribe(
      res => {
        if(res.success){
          this.spinner.hide();
          this.alertify.success(res.message);
          this.router.navigate(['/kaizen/list']);
        } else {
          this.alertify.error(res.message);
          this.spinner.hide();
          return;
        }
      },
      (error) => {
        this.alertify.error("Have Error!!!");
        this.spinner.hide();
      }
    );

  }

  saveAndNext() {

    this.setData();
    if (this.dataKaizen.kaizen_type_combine == false && this.dataKaizen.kaizen_type_eliminate == false
      && this.dataKaizen.kaizen_type_reduce == false && this.dataKaizen.kaizen_type_smart_tool == false) {
      this.alertify.error("Please Chosise Kaizen Type");
      return;
    }
    this.spinner.show();
    this.kaizenService.create(this.dataKaizen).subscribe(
      res => {
        if(res.success){
          this.alertify.success(res.message);
          this.dataKaizen = new Kaizen;
          this.stage = '';
          this.process = '';
          this.url_after = this.urlImage;
          this.url_before = this.urlImage;
          this.spinner.hide();
        } else {
          this.alertify.error(res.message);
          this.spinner.hide();
          return;
        }
      },
      (error) => {
        this.spinner.hide();
        this.alertify.error(error);
      }
    );
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
          title == "mp4"
        ) {

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
                title == "mp4" ) {
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

  stageChange() {
    this.stage = this.dataKaizen.stage_id;
    this.process = '';
    this.getListProcess();
  }
  processChange() {
    this.getListOpera();
  }

}
