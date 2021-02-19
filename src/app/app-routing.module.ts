import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../app/base/layout/app-layout';
import { ProjectListComponent } from '../app/projects/list/projects.list';
import { SettingComponent } from '../app/setting/setting.component';
import { SmtpComponent } from './setting/smtp/setting.smtp'
import { UserComponent } from './setting/user/user.component'
import { DataStorageComponent } from './setting/data-storage/data-storage.component'
import { YamlComponent } from './setting/yaml/yaml.component'
import { MenuComponent } from './setting/menu/menu.component'
import { UrlComponent } from './setting/url/url.component'
import { RefreshComponent } from './setting/refresh/refresh.component'

const routes: Routes = [
  { path:'', redirectTo:'app',pathMatch:'full'},
  {
    path:'app',
    component:AppLayoutComponent,
    children:[
      {
        path:'projects',
        component:ProjectListComponent
      },
      {
        path:'setting',
        component:SettingComponent,
      },
      {
        path:'setting/user',
        component:UserComponent
      },
      {
        path:'setting/smtp',
        component:SmtpComponent
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
