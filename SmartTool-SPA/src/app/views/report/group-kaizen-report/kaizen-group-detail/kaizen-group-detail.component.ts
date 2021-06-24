import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kaizen-group-detail',
  templateUrl: './kaizen-group-detail.component.html',
  styleUrls: ['./kaizen-group-detail.component.scss']
})
export class KaizenGroupDetailComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  backForm() {
    this.router.navigate(['/report/group-kaizen-report/model-detail']);
  }

}
