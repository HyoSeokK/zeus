import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { THEME_ARRAY, ThemeInterface } from '../../services/theme';
import { ThemeService } from '../../services/app-theme.service'
import { clone } from '../../utils/utils'
import { UserService } from '../../setting/user/user.service';

import '@cds/core/toggle/register.js';

@Component({
    selector: 'invitation-layout',
    templateUrl: 'invitation-layout.html',
    styleUrls: ["invitation-layout.css"],   
})

export class InvitationAppLayoutComponent implements OnInit {
    themeArray: ThemeInterface[] = clone(THEME_ARRAY);
    loadingMode : string = "invitation"
    message: string;
    accessAuth : string;

    constructor(
        public theme:ThemeService, 
        private userService:UserService,
        private activatedRoute:ActivatedRoute, ) {
        this.activatedRoute.params.subscribe(params =>{
            this.accessAuth = params['accessAuth']
        
        })

        let styleMode = 'LIGHT'
        this.themeArray.forEach((themeItem) => {
            console.log("theme : " + JSON.stringify(themeItem))
            if (themeItem.showStyle === styleMode) {
              console.log("Current File : " + themeItem.currentFileName) 
              this.theme.loadStyle(themeItem.currentFileName);
            }
        });
    }

    ngOnInit() {
        this.userService.currentMessage.subscribe(message => this.message = message)
        //this.userService.accessAuth.subscribe(message => this.accessAuth = message)
        this.sendMessage("Invitation")
        this.sendAccessMessage(this.accessAuth)
    }
    sendMessage(message : string) {
        this.userService.sendMessage(message);
    }
    sendAccessMessage(message : string) {
        this.userService.sendAccessMessage(message);
    }
    
}