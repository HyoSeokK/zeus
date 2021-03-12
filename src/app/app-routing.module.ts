import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../app/base/layout/app-layout';
import { ProjectListComponent } from '../app/projects/list/projects.list';
import { TargetMenuComponent } from '../app/projects/target-menu/target-menu.component';
import { SettingComponent } from '../app/setting/setting.component';
import { SmtptestComponent } from './setting/smtp/smtp.component'
import { AdministratorUserComponent } from './setting/user/administrator-user/administrator-user.component';
import { DeveloperUserComponent } from './setting/user/developer-user/developer-user.component';

import { AppMainComponent } from '../app/app-main/app-main.component';
import { DataStorageComponent } from './setting/data-storage/data-storage.component'
import { YamlComponent } from './setting/yaml/yaml.component'
import { MenuComponent } from './setting/menu/menu.component'
import { UrlComponent } from './setting/url/url.component'
import { RefreshComponent } from './setting/refresh/refresh.component'
import { KeycloakGuard } from './keycloak.guard';

import { RegisterComponent as AdminRegister} from './setting/user/administrator-user/register/register.component';
import { RegisterComponent as DevRegister } from './setting/user/developer-user/register/register.component';
import { RegisterComponent as YamlRegister} from './setting/yaml/register/register.component';

const routes: Routes = [
  { 
    path:'', 
    redirectTo:'app/main',
    pathMatch:'full', 
  },
  { 
    path:'app', 
    redirectTo:'app/main',
    pathMatch:'full', 
  },
  {
    path:'app',
    component:AppLayoutComponent,
    canActivate: [KeycloakGuard],
    children:[
      {
        path:'main',
        component:AppMainComponent,
      },
      {
        path:'projects',
        component:ProjectListComponent,
      },
      {
        path:'target/:topCode/:subCode',
        component:TargetMenuComponent,
      },
      {
        path:'setting',
        component:SettingComponent,
      },
      {
        path:'setting/user',
        component:AdministratorUserComponent,
      },
      {
        path:'setting/user/admin',
        component:AdministratorUserComponent,
      },
      {
        path:'setting/user/admin/register',
        component:AdminRegister,
      },
      {
        path:'setting/user/developer',
        component:DeveloperUserComponent,
      },
      {
        path:'setting/user/developer/register',
        component:DevRegister,
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
