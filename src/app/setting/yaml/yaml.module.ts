import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClarityModule } from '@clr/angular';

import { YamlComponent } from './yaml.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        ClarityModule
    ],
    declarations:[YamlComponent, RegisterComponent],
    exports:[],
    providers:[]
})
export class YamlModule {}