import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ProjectModule } from '../projects/projects.module'
import { SettingModule } from '../setting/setting.module'
import { UserModule } from '../setting/user/user.module'

import { AppLayoutComponent } from '../base/layout/app-layout'
import { InvitationAppLayoutComponent } from '../base/invitationLayout/invitation-layout';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        ProjectModule,
        SettingModule,
        UserModule
    ],
    declarations:[
        AppLayoutComponent, InvitationAppLayoutComponent
    ],
    exports:[
        AppLayoutComponent, InvitationAppLayoutComponent
    ]
})
export class BaseModule {}