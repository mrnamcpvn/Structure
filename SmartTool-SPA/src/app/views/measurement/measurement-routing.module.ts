import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RftAddComponent } from './rft-add/rft-add.component';
import { RftEditComponent } from './rft-edit/rft-edit.component';
import { RftListComponent } from './rft-list/rft-list.component';

export const routes: Routes = [
    {
        path: "",
        data: {
            title: "Measurement"
        },
        children: [
            {
                path: 'edit',
                component: RftEditComponent,
                data: {
                    title: "Edit RFT"
                }
            },
            {
                path: 'list',
                component: RftListComponent,
                data: {
                    title: "Main"
                }
            },
            {
                path: 'add',
                component: RftAddComponent,
                data: {
                    title: "ADD RFT"
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MeasurementRoutingModule { }
