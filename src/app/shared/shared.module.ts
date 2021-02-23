import { NgModule, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        ClarityModule,
        FormsModule
    ],
    declarations:[],
    exports:[
        BrowserModule,
        ClarityModule, 
        BrowserAnimationsModule
    ]
})
export class SharedModule {
    
}