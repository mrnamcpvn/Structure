import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelResolver } from '../../../_core/_resolvers/model.resolver';
import { ModelListComponent } from './model-list/model-list.component';


const routes: Routes = [
    {
        path: 'model',
        data:{
            title: 'Model',
        },
        children: [
            {
                path:'list',
                component: ModelListComponent,
                resolve: {models: ModelResolver},
                data: {
                    title: 'List Model'
                },
            },
        ]
    }
]




@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModelRoutingModule { }
