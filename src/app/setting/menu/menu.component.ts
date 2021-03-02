import { Component, OnInit } from '@angular/core';

import {TopmenuserviceService} from '../../services/topmenuservice.service'
import {SubmenuserviceService} from '../../services/submenuservice.service'
import {topMenu} from './topmenu'
import {subMenu} from './submenu'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  topMenu: topMenu = new topMenu();
  subMenu: subMenu = new subMenu();

  constructor(private topmenuservice: TopmenuserviceService,private submenuservice: SubmenuserviceService) { }

  ngOnInit(): void {
  }
  onTopMenuSave(){
    this.topmenuservice.saveTopMenu(this.topMenu.top_menu_name,this.topMenu.top_menu_code,
      this.topMenu.top_menu_order)
      .subscribe(() => {
        alert("저장 성공")
        window.location.reload();
      },
      error => {
        console.log(error)
        alert("저장 실패")
      }
      )
  }

  onSubMenuSave(){
    this.submenuservice.saveSubMenu(this.subMenu.sub_menu_name,this.subMenu.top_menu_code,
      this.subMenu.sub_menu_order)
      .subscribe(() => {
        alert("저장 성공")
        window.location.reload();
      },
      error => {
        console.log(error)
        alert("저장 실패")
      }
      )
  }
}
