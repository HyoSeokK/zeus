import { Component, OnInit} from '@angular/core';
import { topMenu } from '../../setting/menu/topmenu'
import { subMenu } from '../../setting/menu/submenu'
import {topMenuIcon} from '../../setting/menu/topmenuicon'
import { TopmenuserviceService } from '../../services/topmenuservice.service'
import { SubmenuserviceService } from '../../services/submenuservice.service'
<<<<<<< HEAD
import { CustomIconService } from '../../services/custom-icon.service'
import '@cds/core/toggle/register.js';
import { ClarityIcons, userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon } from '@cds/core/icon';
=======
import { IconService } from './app-layout.service'
import '@cds/core/toggle/register.js';
import { ClarityIcons, userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon } from '@cds/core/icon';


>>>>>>> 6c38ddf3e36f828ef7d13f81b035f58b18c4fcd7
ClarityIcons.addIcons(userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon);

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
    mySubscription: any;

    constructor(
        private topmenuservice: TopmenuserviceService,
        private submenuservice: SubmenuserviceService,
<<<<<<< HEAD
        private customIcon: CustomIconService
        ){
            customIcon.load();
=======
        private iconService : IconService,
        ){
            iconService.load();
>>>>>>> 6c38ddf3e36f828ef7d13f81b035f58b18c4fcd7
        }

    ngOnInit(){
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
}