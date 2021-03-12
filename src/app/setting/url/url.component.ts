import { Component, OnInit } from '@angular/core';

import {TopmenuserviceService} from '../../services/topmenuservice.service'
import {SubmenuserviceService} from '../../services/submenuservice.service'
import {topMenu} from '../../setting/menu/topmenu'
import {subMenu} from '../../setting/menu/submenu'
import {topMenuIcon} from '../../setting/menu/topmenuicon'

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
  click : boolean = true;
  topMenu: topMenu = new topMenu();
  subMenu: subMenu = new subMenu();
  topMenuIcon: topMenuIcon[]
  TopMenuList : topMenu[]
  SubMenuList : subMenu[]
  TopMenuobj : topMenu = new topMenu();
  SubMenuobj : subMenu = new subMenu();
  TopMenuAddList : Array<topMenu>=new Array<topMenu>();
  SubMenuAddList : Array<subMenu>=new Array<subMenu>();
  topcheck = 0;
  subcheck = 0;
  

  constructor(private topmenuservice: TopmenuserviceService,
    private submenuservice: SubmenuserviceService) { }

  ngOnInit(): void {
    this.topmenuservice.getTopMenu()
    .subscribe(resp => {
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

    this.topMenu.new_window_check = false;
  }
  onTopMenuSave(){
    if(this.topMenu.top_menu_code != null && this.subMenu.sub_menu_code == null){
    this.TopMenuobj = new topMenu();
    this.TopMenuobj.top_menu_code = this.topMenu.top_menu_code
    this.TopMenuobj.top_menu_target_url = this.topMenu.top_menu_target_url
    if(this.topMenu.new_window_check == true){
      this.TopMenuobj.new_window = "_blank"
    } else if(this.topMenu.new_window_check == false){
      this.TopMenuobj.new_window = "_self"
    }
    if(this.TopMenuobj.top_menu_code != null && this.TopMenuobj.top_menu_target_url != null && this.TopMenuobj.new_window != null){
    this.TopMenuAddList.push(this.TopMenuobj);
    this.click = false;
    this.topcheck = 1;
    }
  }
  else if(this.subMenu.sub_menu_code != null){
    this.SubMenuobj = new subMenu();
    this.SubMenuobj.sub_menu_code = this.subMenu.sub_menu_code
    this.SubMenuobj.sub_menu_target_url = this.topMenu.top_menu_target_url
    if(this.topMenu.new_window_check == true){
      this.SubMenuobj.new_window = "_blank"
    } else if(this.topMenu.new_window_check == false){
      this.SubMenuobj.new_window = "_self"
    }
    if(this.SubMenuobj.sub_menu_code != null && this.SubMenuobj.sub_menu_target_url != null && this.SubMenuobj.new_window != null){
    this.SubMenuAddList.push(this.SubMenuobj);
    this.click = false;
    this.subcheck = 1;
  }
  }
  }

  
  onDBSave(){
    if(this.topcheck == 1){
    for(var i = 0; i<this.TopMenuAddList.length; i++){
      this.topmenuservice.saveTopUrlLink(this.TopMenuAddList[i].top_menu_code,this.TopMenuAddList[i].top_menu_target_url,
        this.TopMenuAddList[i].new_window)
        .subscribe(() => {
          console.log("topMenuList : " + this.TopMenuAddList)
          this.ngOnInit();
        },
        error => {
          console.log(error)
          console.log(this.TopMenuAddList)
        }
        )
    }
        if(this.topcheck == 1){
          alert("TopMenuUrl 저장 성공")
         this.topcheck = 0;
         this.click = true;
         this.topMenu.new_window_check = false;
        }else {
          alert("TopMenuUrl 저장 실패")
        }
  }
  if(this.subcheck == 1) {
     for(var i = 0; i<this.SubMenuAddList.length; i++){
      this.submenuservice.saveSubUrlLink(this.SubMenuAddList[i].sub_menu_code,this.SubMenuAddList[i].sub_menu_target_url,
        this.SubMenuAddList[i].new_window)
        .subscribe(() => {
          console.log("subMenuList : " + this.SubMenuAddList)
          this.ngOnInit();
        },
        error => {
          console.log(error)
        }
        )
    }
    if(this.subcheck == 1){ 
      alert("SubMenuUrl 저장 성공")
      this.subcheck = 0;
      this.click = true;
      this.topMenu.new_window_check = false;
    }else {
      alert("SubMenuUrl 저장 실패")
    }
  }

}
}
