import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RftListComponent } from './rft-list/rft-list.component';
import { RftDetailComponent } from './rft-detail/rft-detail.component';

export const routes: Routes = [
    {
        path: "",
        data: {
            title: "RFT Report",
        },
        children: [
            {
                path: "main",
                component: RftListComponent,
                data: {
                    title: "Main",
                },
            },
            {
                path: "rft-detail",
                component: RftDetailComponent,
                data: {
                    title: "RFT Detail",
                },
            },
        ],
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RftReportRoutingModule { }
