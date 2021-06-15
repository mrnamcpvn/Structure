import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';

@Component({
  selector: 'app-defect-reason-add',
  templateUrl: './defect-reason-add.component.html',
  styleUrls: ['./defect-reason-add.component.scss']
})
export class DefectReasonAddComponent implements OnInit {


  defectreason: any ={};
  // flag ="100";
  constructor(
    private defectreasonService: DefectReasonService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {  
    this.defectreasonService.cuttentdefectreason.subscribe(
      (defectreason) => (this.defectreason = this.defectreason)
    );
    // this.defectreasonService.currentFlag.subscribe(
    //   (flag) => (this.flag =flag)
    // );
    // if(this.flag === '0') 
    //   this.defectreason.sequence =0;
  }


  backlist(){
    this.router.navigate(["/maintain/defect-reason/list"]);
  }

  clear(){
    this.defectreason = {};
  }

  saveAndNext(){
    this.defectreasonService.adddr(this.defectreason).subscribe(
      () =>{
        this.alertify.success("success");
        this.defectreason = {};
      }, error =>{
        this.alertify.error(error)
      }
    );
  }
  save(){
    this.defectreasonService.adddr(this.defectreason).subscribe(
      () =>{
        this.alertify.success("success");
        this.backlist();
      }, error =>{
        this.alertify.error(error)
      }
    );
  }
}
