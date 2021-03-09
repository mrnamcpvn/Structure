import { Component, OnInit } from '@angular/core';
import { Model } from '../../../../_core/_models/model';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  models: Model[];
  router: any = {};

  constructor() { }

  ngOnInit() {
  }


  addModel() {
    this.router.navigate(['/maintain/model/add']);
  }
}
