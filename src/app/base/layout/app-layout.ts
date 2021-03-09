import { Component, OnInit} from '@angular/core';
import { topMenu } from '../../setting/menu/topmenu'
import { subMenu } from '../../setting/menu/submenu'
import { TopmenuserviceService } from '../../services/topmenuservice.service'
import { SubmenuserviceService } from '../../services/submenuservice.service'
import { IconService } from './app-layout.service'
import '@cds/core/toggle/register.js';
import { ClarityIcons, userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon } from '@cds/core/icon';


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
    mySubscription: any;

    constructor(
        private topmenuservice: TopmenuserviceService,
        private submenuservice: SubmenuserviceService,
        private iconService : IconService,
        ){
            iconService.load();
        }

    ngOnInit(){
        this.topmenuservice.getTopMenu()
        .subscribe(resp => {
         this.topMenu = resp.body as topMenu[]
         
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
    } 
}