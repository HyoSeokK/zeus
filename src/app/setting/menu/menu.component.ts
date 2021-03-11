import {  Component, OnInit } from '@angular/core';

import {TopmenuserviceService} from '../../services/topmenuservice.service'
import {SubmenuserviceService} from '../../services/submenuservice.service'
import {topMenu} from './topmenu'
import {subMenu} from './submenu'
import {topMenuIcon} from './topmenuicon'
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
  topMenuIcon: topMenuIcon[]
  topMenuCodeList : topMenu[]
  TopMenuList : topMenu[]
  SubMenuList : subMenu[]
  TopMenuobj : topMenu = new topMenu();
  SubMenuobj : subMenu = new subMenu();
  TopMenuAddList : Array<topMenu>=new Array<topMenu>();
  SubMenuAddList : Array<subMenu>=new Array<subMenu>();
  topcheck = 0;
  subcheck = 0;
  

  constructor(private topmenuservice: TopmenuserviceService,
    private submenuservice: SubmenuserviceService,
    private AppLayout: AppLayoutComponent) { }

  ngOnInit() {
    this.topmenuservice.getTopMenu()
    .subscribe(resp => {
      this.topMenuCodeList = resp.body as topMenu[]
      this.TopMenuList = resp.body as topMenu[]
    })

    this.topmenuservice.getTopMenuIcon()
    .subscribe(resp => {
      this.topMenuIcon = resp.body as topMenuIcon[]
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
    this.TopMenuobj.icon_code = this.topMenu.icon_code

    for(var i = 0; i<this.TopMenuList.length; i++){
      if(this.TopMenuobj.top_menu_code == this.TopMenuList[i].top_menu_code){
        alert("존재하는 TopMenuCode")
        this.TopMenuobj = new topMenu();
        
      } else {
        
      }
    }
    if (this.TopMenuobj.top_menu_code != null && this.TopMenuobj.top_menu_name != null && this.TopMenuobj.top_menu_order != null && this.TopMenuobj.icon_code != null){
    this.TopMenuList.push(this.TopMenuobj);
    this.TopMenuAddList.push(this.TopMenuobj);
    this.click = false;
    this.topcheck = 1;
  }
  }

  onSubMenuSave(){
    
    this.SubMenuobj = new subMenu();
    this.SubMenuobj.sub_menu_code = this.subMenu.sub_menu_code
    this.SubMenuobj.sub_menu_name = this.subMenu.sub_menu_name
    this.SubMenuobj.top_menu_code = this.subMenu.top_menu_code
    this.SubMenuobj.sub_menu_order = this.subMenu.sub_menu_order
    this.SubMenuobj.icon_code = this.subMenu.icon_code
    
    for (var i = 0; i<this.SubMenuList.length; i++){
      if(this.SubMenuobj.sub_menu_code == this.SubMenuList[i].sub_menu_code){
        alert("존재하는 SubMenuCode")
        this.SubMenuobj = new subMenu();
        console.log(this.SubMenuobj)
      }
    }
    if(this.SubMenuobj.top_menu_code != null && this.SubMenuobj.sub_menu_name != null && this.SubMenuobj.sub_menu_order != null
      && this.SubMenuobj.sub_menu_code != null && this.SubMenuobj.icon_code != null){
    this.SubMenuList.push(this.SubMenuobj);
    this.SubMenuAddList.push(this.SubMenuobj);
    this.click = false;
    this.subcheck = 1;
  }
    
  }

  onDBSave(){
    if(this.topcheck == 1){
     for (var i = 0; i<this.TopMenuAddList.length; i++){
    this.topmenuservice.saveTopMenu(this.TopMenuAddList[i].top_menu_name,this.TopMenuAddList[i].top_menu_code,
      this.TopMenuAddList[i].top_menu_order,this.TopMenuAddList[i].icon_code)
      .subscribe(() => {
        console.log(this.TopMenuAddList)
        this.ngOnInit();
      },
      error => {
        console.log(error)
        console.log(this.TopMenuAddList)
      }
      )
    } 
      if(this.topcheck == 1){
        alert("TopMenu 저장 성공")
        this.topcheck = 0;
        this.click = true;
      }else {
      alert("TopMenu 저장 실패")
      }
    }
    if(this.subcheck == 1){
        for(var i = 0; i<this.SubMenuAddList.length; i++){
        this.submenuservice.saveSubMenu(this.SubMenuAddList[i].sub_menu_code,this.SubMenuAddList[i].sub_menu_name,this.SubMenuAddList[i].top_menu_code,
        this.SubMenuAddList[i].sub_menu_order,this.SubMenuAddList[i].icon_code)
        .subscribe(() => {
          this.ngOnInit();
        },
        error => {
          console.log(error)
        }
        ) 
      }
      if(this.subcheck == 1){ 
        alert("SubMenu 저장 성공")
        this.subcheck = 0;
        this.click = true;
      }else {
        alert("SubMenu 저장 실패")
      }
    }
  }

  onTopMenuGet(topMenu){
    this.topMenu = topMenu
  }

  onSubMenuGet(subMenu){
    this.subMenu = subMenu
  }

  onTopMenuDelete() {
    if(this.topMenu.top_menu_name != null && this.topMenu.top_menu_code != null && this.topMenu.top_menu_order != null && this.topMenu.icon_code !=null){
    this.topmenuservice.deleteTopMenu(this.topMenu.top_menu_name,this.topMenu.top_menu_code,this.topMenu.top_menu_order,this.topMenu.icon_code)
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

  onSubMenuDelete() {
    if(this.subMenu.sub_menu_code != null && this.subMenu.sub_menu_name != null && this.subMenu.top_menu_code != null && this.subMenu.sub_menu_order != null)
    this.submenuservice.deleteSubMenu(this.subMenu.sub_menu_code,this.subMenu.sub_menu_name,this.subMenu.top_menu_code,
      this.subMenu.sub_menu_order,this.subMenu.icon_code)
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
