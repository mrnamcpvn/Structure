import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KaizenReportService } from '../../../../_core/_services/kaizen-report.service';

@Component({
  selector: 'app-kaizen-detail',
  templateUrl: './kaizen-detail.component.html',
  styleUrls: ['./kaizen-detail.component.scss']
})
export class KaizenDetailComponent implements OnInit {

  kaizenDetail: any = null;
  constructor(
    private router: Router,
    private kaizenService: KaizenReportService,
  ) { }

  ngOnInit(): void {
  }

  backForm() {
    this.router.navigate(['/report/kaizen-report/model-detail']);
  }

  

}
