import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';

@Component({
  selector: 'app-defect-reason-edit',
  templateUrl: './defect-reason-edit.component.html',
  styleUrls: ['./defect-reason-edit.component.scss']
})
export class DefectReasonEditComponent implements OnInit {
  defectreasonLocal: any = JSON.parse(localStorage.getItem('defactreasonSmartTooling'));
  constructor(
    private defectreasonService: DefectReasonService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.loadData();
    localStorage.removeItem('defactreasonSmartTooling');
  }
  loadData(){
    this.defectreasonLocal;
  }
  clear(){
    this.defectreasonLocal={};
  }

  backList(){
    this.router.navigate(["/maintain/defect-reason/list"]);
    localStorage.removeItem('defactreasonSmartTooling');
  }


  save(){
    this.defectreasonService.update(this.defectreasonLocal).subscribe(
      () =>{
        this.alertify.success("success");
        this.backList();
        localStorage.removeItem('defactreasonSmartTooling');
      }, error =>{
        this.alertify.error(error)
      }
    );
  }
}
