import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ModelListComponent } from './model-list/model-list.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Model',
        },
        children: [
            {
                path: 'list',
                component: ModelListComponent,
                data: {
                    title: 'List Model'
                },
            },
            {
                path: 'add',
                component: AddComponent,
                data: {
                    title: 'Add new Model'
                },
            },
            {
                path: "edit",
                component: EditComponent,
                data: {
                    title: "Edit Model",
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
