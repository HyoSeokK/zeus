import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { SmtpComponent } from './smtpSample/setting.smtp'
import { ClarityModule } from '@clr/angular';
import { UserComponent } from './user/user.component';
import { DataStorageComponent } from './data-storage/data-storage.component';
import { YamlComponent } from './yaml/yaml.component';
import { MenuComponent } from './menu/menu.component';
import { UrlComponent } from './url/url.component';
import { RefreshComponent } from './refresh/refresh.component';
import { SettingComponent } from './setting.component';

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        ClarityModule
    ],
    declarations:[
        SmtpComponent,
        UserComponent,
        DataStorageComponent,
        YamlComponent,
        MenuComponent,
        UrlComponent,
        RefreshComponent,
        SettingComponent
    ],
    exports:[
    ],
    providers:[]
})
export class SettingModule {}