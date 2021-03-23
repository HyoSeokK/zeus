import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

import { RegisterComponent as AdminRegister } from './administrator-user/register/register.component';
import { AdministratorUserComponent } from './administrator-user/administrator-user.component';
import { DeveloperUserComponent } from './developer-user/developer-user.component';
import { RegisterComponent } from './developer-user/register/register.component';
import { AdminUpdateComponent } from './administrator-user/update/update.component'

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        ClarityModule,
    ],
    declarations:[
        AdministratorUserComponent, 
        AdminRegister,
        DeveloperUserComponent,
        RegisterComponent,
        AdminUpdateComponent, 
    ],
    exports:[],
    providers:[]
})
export class UserModule {}