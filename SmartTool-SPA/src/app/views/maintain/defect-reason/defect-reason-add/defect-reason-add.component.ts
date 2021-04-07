import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertUtilityService } from '../../../../_core/_services/alertUtility.service';
import { DefectReasonService } from '../../../../_core/_services/defect-reason.service';

@Component({
  selector: 'app-defect-reason-add',
  templateUrl: './defect-reason-add.component.html',
  styleUrls: ['./defect-reason-add.component.scss']
})
export class DefectReasonAddComponent implements OnInit {
  defectReason: any = {};
  flag = '100';

  constructor(
    private defectReasonService: DefectReasonService,
    private alertUtility: AlertUtilityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.defectReasonService.currentdefectreason.subscribe(
      (defectReason) => (this.defectReason = defectReason)
    );
    // flag 1=add, 0=edit
    this.defectReasonService.currentFlag.subscribe(
      (flag) => (this.flag = flag)
    );

    if (this.flag === '0') {  this.defectReason.sequence = 0; }
  }

  backList() {
    this.router.navigate(['./maintain/defect-reason']);
  }

  saveAndNext() {
    if (this.flag === '0') {
      this.defectReasonService.createDefectReason(this.defectReason).subscribe((res) => {
        this.alertUtility.success('Add success', 'Success');
        this.defectReason = {};
        this.router.navigate(['./maintain/defect-reason']);
      }, error => {
        this.alertUtility.error(error, 'Error');
      });
    }
  }

  save() {
    if (this.flag === '0') {
      console.log('save add');
      this.defectReasonService.createDefectReason(this.defectReason).subscribe(
        () => {
          this.alertUtility.success('Add succeed', 'Success');
        },
        (error) => {
          this.alertUtility.error(error, 'Error');
        }
      );
    } else {
      console.log('save edit');
      this.defectReasonService.updateDefectReason(this.defectReason).subscribe(
        () => {
          this.alertUtility.success('Updated succeed', 'Success');
        },
        (error) => {
          this.alertUtility.error(error, 'Error');
        }
      );
    }
  }

  clear() {
    this.defectReason = {};
  }

}
