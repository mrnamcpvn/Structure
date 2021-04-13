import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModelOperation } from '../_models/model-operation';
import { AlertifyService } from '../_services/alertify.service';
import { ModelService } from '../_services/model.service';

@Injectable()


export class ModelOperationEditResolver implements Resolve<ModelOperation> {

    constructor(
        private modelService: ModelService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        let factory_id = route.params.factory_id;
        let model_no = route.params.model_no;
        let operation_id = route.params.operation_id;
        let stage_id = route.params.stage_id;



        const modelNo = route.paramMap.get('modelNo');
        factory_id = route.paramMap.get("factory_id");
        operation_id = route.paramMap.get("operation_id");
        stage_id = route.paramMap.get("stage_id");
        model_no = route.paramMap.get("model_no");
        return this.modelService.getModelNoEdit(modelNo).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/category']);
                return of(null);
            }),
        );
    }
}