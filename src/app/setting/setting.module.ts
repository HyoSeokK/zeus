import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { UserModule } from './user/user.module';
import { YamlModule } from './yaml/yaml.module';
import { GroupModule } from './group/group.module';
import { ClarityModule } from '@clr/angular';

import { SmtpComponent } from './smtpSample/setting.smtp'
import { DataStorageComponent } from './data-storage/data-storage.component';
import { MenuComponent } from './menu/menu.component';
import { UrlComponent } from './url/url.component';
import { RefreshComponent } from './refresh/refresh.component';
import { SettingComponent } from './setting.component';

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        ClarityModule,
        UserModule,
        YamlModule,
        GroupModule
    ],
    declarations:[
        SmtpComponent,
        DataStorageComponent,
        MenuComponent,
        UrlComponent,
        RefreshComponent,
        SettingComponent,
    ],
    exports:[
    ],
    providers:[]
})
export class SettingModule {}