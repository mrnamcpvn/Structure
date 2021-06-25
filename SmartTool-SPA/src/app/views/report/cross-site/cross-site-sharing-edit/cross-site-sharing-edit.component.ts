import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { CrossSiteSharingService } from '../../../../_core/_services/cross-site-sharing.service';

@Component({
  selector: 'app-cross-site-sharing-edit',
  templateUrl: './cross-site-sharing-edit.component.html',
  styleUrls: ['./cross-site-sharing-edit.component.scss']
})
export class CrossSiteSharingEditComponent implements OnInit {

  model_no:string="";
  serialNo:string ="";
  factory:string ="";
  models:any ={};
  kaizen:any={};
  isvideoB4: boolean = false;
  isvideoAfter: boolean = false;
  urlImage: any = environment.imageUrl + "images/no-image.jpg";
  url_after: any = environment.imageUrl;
  url_before: any = environment.imageUrl;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private crosssitesharingSerivce: CrossSiteSharingService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.factory = this.route.snapshot.params['factory'];
    this.model_no = this.route.snapshot.params['modelNo'];
    this.serialNo = this.route.snapshot.params['serial_no'];
    this.loaddata();
  }

  back(){
    this.router.navigate(['/report/cross-site-sharing/list']);
  }

  loaddata(){
    this.spinner.show();
   this.crosssitesharingSerivce.getCrossSiteSharingEdit(this.factory,this.model_no,this.serialNo).subscribe(res=>{
     this.models = res.crossSiteSharingDTO;
     this.kaizen =res;
     if (this.kaizen.before_media != "") {
       if (this.kaizen.before_media.split(".").pop() == "mp4" ||
         this.kaizen.before_media.split(".").pop() == "MP4") {
         this.isvideoB4 = true;
       }
       this.url_before = this.url_before + this.kaizen.before_media;

     }
     else {
       this.url_before = this.urlImage;
     }
     if (this.kaizen.after_media != "") {
       if (this.kaizen.after_media.split(".").pop() == "mp4" ||
         this.kaizen.after_media.split(".").pop() == "MP4") {
         this.isvideoAfter = true;
       }
       this.url_after = this.url_after + this.kaizen.after_media;
     }
     else {
       this.url_after = this.urlImage;
     }
     this.spinner.hide();
   },error=>{
     this.alertify.error("Have error");
   })
 }

 save(){
  if(this.models.benefits_category_hse==false && this.models.benefits_category_quality ==false
    && this.models.benefits_category_delivery ==false && this.models.benefits_category_efficiency==false
    && this.models.benefits_category_others == false)
  {
    this.alertify.error("Please Choise Benefits Category")
  }
  else
  {
    this.crosssitesharingSerivce.UpdateCrossSiteSharing(this.models).subscribe(
      res => {
        if(res.success) {
          this.alertify.success(res.message);
          this.router.navigate(['/report/cross-site-sharing/list']);
        } else {
          this.alertify.error(res.message);
          return;
        }
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}

}
