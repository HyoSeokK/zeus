import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ProjectModule } from '../projects/projects.module'
import { SettingModule } from '../setting/setting.module'

import { AppLayoutComponent } from '../base/layout/app-layout'

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        ProjectModule,
        SettingModule
    ],
    declarations:[
        AppLayoutComponent
    ],
    exports:[
        AppLayoutComponent
    ]
})
export class BaseModule {}