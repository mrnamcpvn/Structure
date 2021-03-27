import { ModelAService } from './../../../../_core/_services/model-a.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Subscription, timer } from 'rxjs';
import { Model } from '../../../../_core/_models/model';
import { Pagination } from '../../../../_core/_models/pagination';
import { ModelQuery } from '../../../../_core/_queries/model.query';
import { AlertUtilityService } from '../../../../_core/_services/alertUtility.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  models: Model[];
  model: Model = {} as Model;
  activeList: Array<Select2OptionData>;
  modelToBeUpDated: Model;
  isUpdateActivated = false;
  noData: boolean = false;
  pagination: Pagination;
  subscription: Subscription = new Subscription();
  paramSearch = {
    active: 'all',
    model_search: '',
  };

  constructor(
    private modelAService: ModelAService,
    private modelQuery: ModelQuery,
    private spinnerService: NgxSpinnerService,
    private alertUtility: AlertUtilityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.modelQuery.selectLoading().subscribe(isLoading => isLoading ? this.spinnerService.show() : this.spinnerService.hide())
    );

    this.subscription.add(
      this.modelQuery.selectAll().subscribe(models => this.models = models)
    );
    this.loadData();
  }

  loadData() {
    timer(500).pipe(switchMap(() => this.modelAService.GetAllAsync())).subscribe();
  }

  addNew() {
    this.router.navigate(['/maintain-a/model-a/add']);
  }
  editModel(modelNo: Model) {
    this.router.navigate(['/maintain-a/model-a/edit/' + modelNo.model_no]);
  }
  deleteModel(model: Model) {
    this.alertUtility.confirm('Are you sure you want to detele this record?', 'Delete Model', () => {
      this.subscription.add(
        this.modelAService.deleteModel(model).subscribe(() => {
          this.alertUtility.success('Model was successfully deleted.', 'Success!');
        }, error => {
          this.alertUtility.error('Deleting model failed on save.', 'Error');
          console.log(error);
        })
      );
    });
  }

  showUpdateForm(model: Model) {
    this.modelToBeUpDated = {...model};
    this.isUpdateActivated = true;
  }

  updateModel(updateForm: any) {
    this.subscription.add(
      this.modelAService.Update(updateForm.value).subscribe(() => {
        this.alertUtility.success('Model was Success updated', 'Success!');
      }, error => {
        this.alertUtility.error('Updating Model Failed on save', 'Error');
      })
    );
      this.isUpdateActivated = false;
      this.modelToBeUpDated = null;
  }

  clear() {
    this.paramSearch.active = 'all';
    this.paramSearch.model_search = '';
    this.loadData();
  }

}
