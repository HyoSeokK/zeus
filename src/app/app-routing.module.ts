import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../app/base/layout/app-layout';
import { ProjectListComponent } from '../app/projects/list/projects.list';
import { TargetMenuComponent } from '../app/projects/target-menu/target-menu.component';
import { SettingComponent } from '../app/setting/setting.component';
import { SmtpComponent } from './setting/smtpSample/setting.smtp'
import { SmtptestComponent } from './setting/smtp/smtp.component'
import { UserComponent } from './setting/user/user.component'
import { DataStorageComponent } from './setting/data-storage/data-storage.component'
import { YamlComponent } from './setting/yaml/yaml.component'
import { MenuComponent } from './setting/menu/menu.component'
import { UrlComponent } from './setting/url/url.component'
import { RefreshComponent } from './setting/refresh/refresh.component'
import { KeycloakGuard } from './keycloak.guard';

import { RegisterComponent as UserRegister} from './setting/user/register/register.component';
import { RegisterComponent as YamlRegister} from './setting/yaml/register/register.component';

const routes: Routes = [
  { path:'', redirectTo:'app',pathMatch:'full', },
  {
    path:'app',
    component:AppLayoutComponent,
    canActivate: [KeycloakGuard],
    children:[
      {
        path:'projects',
        component:ProjectListComponent,
      },
      {
        path:'grafana',
        component:TargetMenuComponent,
        canActivate: [KeycloakGuard],
      },
      {
        path:'setting',
        component:SettingComponent,
      },
      {
        path:'setting/user',
        component:UserComponent,
      },
      {
        path:'setting/user/register',
        component:UserRegister,
      },
      {
        path:'setting/smtp',
        component:SmtptestComponent
      },
      {
        path:'setting/dataStorage',
        component:DataStorageComponent
      },
      {
        path:'setting/yaml',
        component:YamlComponent
      },
      {
        path:'setting/yaml/register',
        component:YamlRegister
      },
      {
        path:'setting/menu',
        component:MenuComponent
      },
      {
        path:'setting/url',
        component:UrlComponent
      },
      {
        path:'setting/refresh',
        component:RefreshComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
