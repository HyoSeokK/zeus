import { NgModule, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    declarations:[],
    exports:[
        BrowserModule,
        ClarityModule, 
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

    ]
})
export class SharedModule {
    
}