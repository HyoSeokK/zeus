import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

import { UserComponent } from './user.component';
import { RegisterComponent } from './register/register.component'

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        ClarityModule
    ],
    declarations:[UserComponent, RegisterComponent],
    exports:[],
    providers:[]
})
export class UserModule {}