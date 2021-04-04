import { Component, OnInit,Inject, PLATFORM_ID} from '@angular/core';
import { topMenu } from '../../setting/menu/topmenu'
import { subMenu } from '../../setting/menu/submenu'
import { topMenuIcon } from '../../setting/menu/topmenuicon'
import { Router } from '@angular/router';
import { TopmenuserviceService } from '../../services/topmenuservice.service'
import { SubmenuserviceService } from '../../services/submenuservice.service'
import { CustomIconService } from '../../services/custom-icon.service'
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import '@cds/core/toggle/register.js';
import { ClarityIcons, userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon } from '@cds/core/icon';
ClarityIcons.addIcons(userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon);
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-layout',
    templateUrl: 'app-layout.html',
    styleUrls: ["app-layout.css"],   
})

export class AppLayoutComponent implements OnInit{
    isUserExisting = true;
    topMenu : topMenu[] 
    subMenu : subMenu[]
    topMenuIcon: topMenuIcon[]
    subMenuIcon: topMenuIcon[]
    linkRef: HTMLLinkElement;
    username : string;

    constructor(
        private topmenuservice: TopmenuserviceService,
        private submenuservice: SubmenuserviceService,
        private customIcon: CustomIconService,
        private router:Router,
        protected readonly keycloak: KeycloakService,
        @Inject(DOCUMENT) private document: Document, 
        @Inject(PLATFORM_ID) private platformId: Object) 
        {
            customIcon.load(); 
              this.username = localStorage.getItem('username')
            }

    sessionLogout() {
        this.keycloak.logout();
    }

    ngOnInit() {
        /* this.topMenu = JSON.parse(localStorage.getItem("topmenu")) as topMenu[]
        console.log("topMenu : " + this.topMenu) */
        this.topmenuservice.getTopMenu()
        .subscribe(resp => {
            this.topMenu = resp.body as topMenu[]
            console.log(this.topMenu)
            },
            error => {
                console.log(error)
            }
        )

       this.submenuservice.getSubMenu()
        .subscribe(resp => {
            this.subMenu = resp.body as subMenu[]
        },
        error => {
            console.log(error)
        }
       )

       this.topmenuservice.getTopMenuIcon()
        .subscribe(resp => {
        this.topMenuIcon = resp.body as topMenuIcon[]
        this.subMenuIcon = resp.body as topMenuIcon[]
        })
    }

    goToMain() : void {
        console.log("main page")
        this.router.navigateByUrl("/app/main");
    } 

    
}