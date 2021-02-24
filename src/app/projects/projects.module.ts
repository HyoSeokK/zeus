import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './list/projects.list'
import { ClarityModule } from '@clr/angular';
import { TargetMenuComponent } from './target-menu/target-menu.component';

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        ClarityModule
    ],
    declarations:[ProjectListComponent, TargetMenuComponent],
    exports:[
        ProjectListComponent,
        ClarityModule
    ],
    providers:[]
})
export class ProjectModule {}