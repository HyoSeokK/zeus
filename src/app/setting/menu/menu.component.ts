import {  Component, OnInit } from '@angular/core';

import {TopmenuserviceService} from '../../services/topmenuservice.service'
import {SubmenuserviceService} from '../../services/submenuservice.service'
import {topMenu} from './topmenu'
import {subMenu} from './submenu'
import { AppLayoutComponent } from 'src/app/base/layout/app-layout';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  click : boolean = true;
  topMenu: topMenu = new topMenu();
  subMenu: subMenu = new subMenu();
  topMenuCodeList : topMenu[]
  TopMenuList : topMenu[]
  SubMenuList : subMenu[]
  TopMenuobj : topMenu = new topMenu();
  SubMenuobj : subMenu = new subMenu();
  TopMenuAddList : Array<topMenu>=new Array<topMenu>();
  SubMenuAddList : Array<subMenu>=new Array<subMenu>();
  

  constructor(private topmenuservice: TopmenuserviceService,
    private submenuservice: SubmenuserviceService,
    private AppLayout: AppLayoutComponent) { }

  ngOnInit() {
    this.topmenuservice.getTopMenu()
    .subscribe(resp => {
      this.topMenuCodeList = resp.body as topMenu[]
      this.TopMenuList = resp.body as topMenu[]
    })

    this.submenuservice.getSubMenu()
    .subscribe(resp => {
      this.SubMenuList = resp.body as subMenu[]
    })
     this.AppLayout.ngOnInit();     
  }
  onTopMenuSave(){
    this.TopMenuobj = new topMenu();
    this.TopMenuobj.top_menu_code = this.topMenu.top_menu_code
    this.TopMenuobj.top_menu_name = this.topMenu.top_menu_name
    this.TopMenuobj.top_menu_order = this.topMenu.top_menu_order

    this.TopMenuList.push(this.TopMenuobj);
    this.TopMenuAddList.push(this.TopMenuobj);
    
    this.click = false;
  }

  onSubMenuSave(){
    this.SubMenuobj = new subMenu();
    this.SubMenuobj.sub_menu_code = this.subMenu.sub_menu_code
    this.SubMenuobj.sub_menu_name = this.subMenu.sub_menu_name
    this.SubMenuobj.top_menu_code = this.subMenu.top_menu_code
    this.SubMenuobj.sub_menu_order = this.subMenu.sub_menu_order

    this.SubMenuList.push(this.SubMenuobj);
    this.SubMenuAddList.push(this.SubMenuobj);
    this.click = false;
  }

  onDBSave(){    
     for (var i = 0; i<this.TopMenuAddList.length; i++){
    this.topmenuservice.saveTopMenu(this.TopMenuAddList[i].top_menu_name,this.TopMenuAddList[i].top_menu_code,
      this.TopMenuAddList[i].top_menu_order)
      .subscribe(() => {
        alert("저장 성공")
        console.log(this.TopMenuAddList)
        this.ngOnInit();    
      },
      error => {
        console.log(error)
        alert("저장 실패")
      }
      )
    } 
        for(var i = 0; i<this.SubMenuAddList.length; i++){
        this.submenuservice.saveSubMenu(this.SubMenuAddList[i].sub_menu_code,this.SubMenuAddList[i].sub_menu_name,this.SubMenuAddList[i].top_menu_code,
        this.SubMenuAddList[i].sub_menu_order)
        .subscribe(() => {
          alert("저장 성공")
          this.ngOnInit();  
        },
        error => {
          console.log(error)
          alert("저장 실패")
        }
        ) 
      }   
  }

  onTopMenuGet(topMenu){
    this.topMenu = topMenu
  }

  onSubMenuGet(subMenu){
    this.subMenu = subMenu
  }

  onTopMenuDelete() {
    this.topmenuservice.deleteTopMenu(this.topMenu.top_menu_name,this.topMenu.top_menu_code,this.topMenu.top_menu_order)
    .subscribe(() => { 
      alert("삭제 성공")
      this.ngOnInit();
    },
    error => {
      console.log(error)
      alert("삭제 실패")
    }
    )
  }

  onSubMenuDelete() {
    this.submenuservice.deleteSubMenu(this.subMenu.sub_menu_code,this.subMenu.sub_menu_name,this.subMenu.top_menu_code,
      this.subMenu.sub_menu_order)
      .subscribe(() => {
        alert("삭제 성공")
        this.ngOnInit();
      },
      error => {
        console.log(error)
        alert("삭제 실패")
      }
      )
  }
}
