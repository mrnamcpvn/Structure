import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { GroupKaizenReportService } from '../../../../_core/_services/group-kaizen-report.service';
import {KaizenBenefitsApplicationForm} from "../../../../_core/_models/kaizen-benefits-application-form";
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { FunctionUtility } from '../../../../_core/_ultility/function-utility';
@Component({
  selector: 'app-kaizen-group-detail',
  templateUrl: './kaizen-group-detail.component.html',
  styleUrls: ['./kaizen-group-detail.component.scss']
})
export class KaizenGroupDetailComponent implements OnInit {
  kaizen: any;
  kaizenDetail: any = null;
  improv: string;
  rftDiff: string;
  url: any = environment.imageUrl;
  isMediaBefore: string = '';
  isMediaAfter: string = '';
  isCross:boolean = true;
  Factory: string = '';
  constructor(private router: Router,
              private functionUtility: FunctionUtility,
              private kaizenService: GroupKaizenReportService,
              private spinner: NgxSpinnerService,
              private alertify: AlertifyService,) { }

  ngOnInit() {
   
    this.kaizenService.currentKaizen.subscribe(res => this.kaizen = res);
    if(this.kaizen !== null) {
      this.getKaizenDetail();
      this.getFactory();
    } else {
      this.router.navigate(["/report/group-kaizen-report/main"]);
    }
  }
  getKaizenDetail() {
    this.kaizenService.getKaizenDetail(this.kaizen.factory_id,this.kaizen.model_no,this.kaizen.serial_no).subscribe(res => {
      this.kaizenDetail = res;
      this.kaizenDetail.kaizen.before_remarks = this.functionUtility.replaceLineBreak(this.kaizenDetail.kaizen.before_remarks);
      this.kaizenDetail.kaizen.after_remarks = this.functionUtility.replaceLineBreak(this.kaizenDetail.kaizen.after_remarks);
       // ----------------------------Show media video or picture--------------------//
      if(!this.functionUtility.isEmpty(this.kaizenDetail.kaizen.before_media)) {
        let mediaBefore = this.kaizenDetail.kaizen.before_media.trim();
        if(mediaBefore.split('.')[1] === 'mp4' || mediaBefore.split('.')[1] === 'MP4') {
          this.isMediaBefore = 'mp4';
        } else {
          this.isMediaBefore = 'picture';
        }
      }

      if(!this.functionUtility.isEmpty(this.kaizenDetail.kaizen.after_media)) {
        let mediaAfter = this.kaizenDetail.kaizen.after_media.trim();
        if(mediaAfter.split('.')[1] === 'mp4' || mediaAfter.split('.')[1] === 'MP4') {
          this.isMediaAfter = 'mp4';
        } else {
          this.isMediaAfter = 'picture';
        }
      }

      this.improv = (100*(this.kaizenDetail.kaizen.ct_before_sec - this.kaizenDetail.kaizen.ct_after_sec) / this.kaizenDetail.kaizen.ct_before_sec).toFixed(2);
      this.rftDiff = (this.kaizenDetail.kaizen.rft_after_percent - this.kaizenDetail.kaizen.rft_before_percent).toFixed(2);
    });
  }
  backForm() {
    this.router.navigate(['/report/group-kaizen-report/model-detail']);
  }
  addCross(){
    this.alertify.confirm("Cross Site Sharing","This action cannot be undo. Please confirm.",()=>{
    let kaizenBenefitsApplicationForm = new KaizenBenefitsApplicationForm();
    kaizenBenefitsApplicationForm.factory_id =this.kaizen.factory_id;
    kaizenBenefitsApplicationForm.model_no = this.kaizen.model_no;
    kaizenBenefitsApplicationForm.serial_no =this.kaizen.serial_no;
    this.spinner.show();
    this.kaizenService.addCross(kaizenBenefitsApplicationForm).subscribe(
      res => {
        if(res.success){
          this.spinner.hide();
          this.alertify.success(res.message);
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
  })
  }
  getFactory(){
    this.kaizenService.getFactory().subscribe(res=>{
      if(this.kaizen.factory_id!=res){
        this.isCross = false;
      }
    });
  }
}
