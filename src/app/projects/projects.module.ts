import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './list/projects.list'
import { ClarityModule } from '@clr/angular';

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        ClarityModule
    ],
    declarations:[ProjectListComponent],
    exports:[
        ProjectListComponent,
        ClarityModule
    ],
    providers:[]
})
export class ProjectModule {}