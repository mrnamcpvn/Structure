import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupKaizenDetailComponent } from './group-kaizen-detail/group-kaizen-detail.component';
import { GroupKaizenListComponent } from './group-kaizen-list/group-kaizen-list.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Group Kaizen Report'
        },
        children: [
            {
                path: 'main',
                component: GroupKaizenListComponent,
                data: {
                    title: 'Main'
                },
            },
            {
                path: 'model-detail',
                component: ModelDetailComponent,
                data: {
                    title: 'Model Detail'
                },
            },
            {
                path: 'kaizen-detail',
                component: GroupKaizenDetailComponent,
                data: {
                    title: 'Group Kaizen Detail'
                },
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupKaizenReportRoutingModule { }
