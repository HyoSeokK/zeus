import { Component, OnInit } from '@angular/core';

import {TopmenuserviceService} from '../../services/topmenuservice.service'
import {SubmenuserviceService} from '../../services/submenuservice.service'
import {topMenu} from '../../setting/menu/topmenu'
import {subMenu} from '../../setting/menu/submenu'
import {topMenuIcon} from '../../setting/menu/topmenuicon'
import {NotificationService} from '../../services/notification.service'

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
  click : boolean = true;
  Deleteclick : boolean = true;
  topMenu: topMenu = new topMenu();
  subMenu: subMenu = new subMenu();
  topMenuInfo: topMenu = new topMenu();
  subMenuInfo: subMenu = new subMenu();
  topMenuIcon: topMenuIcon[]
  TopMenuList : topMenu[]
  SubMenuList : subMenu[]
  TopopenModal = false;
  SubopenModal = false;

  constructor(private topmenuservice: TopmenuserviceService,
    private submenuservice: SubmenuserviceService,
    private notifyservice: NotificationService) { }

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
     if(this.topMenu.top_menu_code == null && this.topMenu.top_menu_target_url == null && this.subMenu.sub_menu_code == null){
      this.notifyservice.showWarning("입력값을 확인해주세요1","");
    } 
    if(this.topMenu.top_menu_code != null && this.subMenu.sub_menu_code == null){
     
      if(this.topMenu.new_window_check == true){
        this.topMenu.new_window = "_blank"
      } else if(this.topMenu.new_window_check == false){
        this.topMenu.new_window = "_self"
      }
    
      if(this.topMenu.top_menu_target_url != null && this.topMenu.top_menu_target_url != ""){
        this.topmenuservice.saveTopUrlLink(this.topMenu.top_menu_code,this.topMenu.top_menu_target_url,this.topMenu.new_window)
        .subscribe(() => {
          this.notifyservice.showSuccess("입력정보가 저장 되었습니다","");
          this.onReset();
        },
        error => {
          console.log(error)
          this.notifyservice.showError("입력정보 저장에 실패하였습니다","");
        }
        )
      }
      else {
        this.notifyservice.showWarning("입력값을 확인해주세요2","")
      }
    }
    else if(this.subMenu.sub_menu_code != null){
   
      if(this.topMenu.new_window_check == true){
        this.subMenu.new_window = "_blank"
      } else if(this.topMenu.new_window_check == false){
        this.subMenu.new_window = "_self"
      }
      if(this.topMenu.top_menu_target_url != null){
        this.submenuservice.saveSubUrlLink(this.subMenu.sub_menu_code,this.topMenu.top_menu_target_url,this.subMenu.new_window)
        .subscribe(() => {
          this.notifyservice.showSuccess("입력정보가 저장 되었습니다", "");
          this.onReset();
        },
        error => {
          console.log(error)
          this.notifyservice.showError("입력정보 저장에 실패하였습니다", "");
        }
        )
      }
      else {
        this.notifyservice.showWarning("입력값을 확인해주세요3","")
      }
    }
  }

  onTopMenuGet(topMenu){
    this.topMenuInfo = topMenu
    this.topMenu.top_menu_code = this.topMenuInfo.top_menu_code
    this.topMenu.top_menu_name = this.topMenuInfo.top_menu_name
    this.topMenu.top_menu_order = this.topMenuInfo.top_menu_order
    this.topMenu.icon_code = this.topMenuInfo.icon_code
    this.topMenu.top_menu_target_url = this.topMenuInfo.top_menu_target_url
    this.topMenu.new_window = this.topMenuInfo.new_window
    
    if(this.topMenu.new_window == "_blank"){
      this.topMenu.new_window_check = true  
    }else if(this.topMenu.new_window == "_self"){
      this.topMenu.new_window_check = false
    }
    if(this.topMenu.top_menu_target_url == "null"){
      this.topMenu.top_menu_target_url = "";
    }
    
    this.Deleteclick = false;
  }

  onSubMenuGet(subMenu){
    this.subMenuInfo = subMenu
    this.subMenu.sub_menu_name = this.subMenuInfo.sub_menu_name
    this.subMenu.sub_menu_code = this.subMenuInfo.sub_menu_code
    this.subMenu.sub_menu_order = this.subMenuInfo.sub_menu_order
    this.subMenu.top_menu_code = this.subMenuInfo.top_menu_code
    this.subMenu.icon_code = this.subMenuInfo.icon_code
    this.topMenu.top_menu_target_url = this.subMenuInfo.sub_menu_target_url
    this.subMenu.new_window = this.subMenuInfo.new_window
    
    if(this.subMenu.new_window == "_blank"){
      this.topMenu.new_window_check = true  
    }else if(this.subMenu.new_window == "_self"){
      this.topMenu.new_window_check = false
    }
    if(this.topMenu.top_menu_target_url == "null"){
      this.topMenu.top_menu_target_url = "";
    }

    this.Deleteclick = false;
  }
  onOpenModal(){
    if(this.topMenu.top_menu_target_url == ""){
      this.notifyservice.showWarning("입력값을 확인해주세요","")
    }else{
      this.onModal();
    }
  }

  onModal(){
    if(this.topMenu.top_menu_code != null && this.subMenu.sub_menu_code ==null){
      this.TopopenModal = true;
    }else if(this.subMenu.sub_menu_code != null){
      this.SubopenModal = true;
    }
  }

  onTopMenuDelete(){
    if(this.topMenu.top_menu_code == null && this.topMenu.top_menu_target_url == "" && this.subMenu.sub_menu_code == null){
      this.notifyservice.showWarning("입력값을 확인해주세요","");
      this.TopopenModal = false;
    }
    if(this.topMenu.top_menu_code != null && this.subMenu.sub_menu_code == null){
      if(this.topMenu.top_menu_target_url != null && this.topMenu.top_menu_target_url != ""){
      this.topmenuservice.deleteTopUrlLink(this.topMenu.top_menu_code,"null")
      .subscribe(() => {
        this.notifyservice.showSuccess("입력정보가 삭제 되었습니다","");
        this.onReset();
        this.TopopenModal = false;
      },
      error => {
        console.log(error)
        this.notifyservice.showError("입력정보 삭제에 실패하였습니다", "");
        this.TopopenModal = false;  
      }
      )
      }
      else{
        this.notifyservice.showWarning("입력값을 확인해주세요","");
        this.TopopenModal = false;
      }
    }
    else if(this.subMenu.sub_menu_code != null){
      if(this.topMenu.top_menu_target_url != null && this.topMenu.top_menu_target_url != ""){
        this.submenuservice.deleteSubUrlLink(this.subMenu.sub_menu_code,"null")
        .subscribe(() => {
          this.notifyservice.showSuccess("입력정보가 삭제 되었습니다", "");
          this.onReset();
          this.SubopenModal = false;
        },
        error => {
          console.log(error)
          this.notifyservice.showError("입력정보 삭제에 실패하였습니다", "");
          this.SubopenModal = false;
        }
        )
      }
      else{
        this.notifyservice.showWarning("입력값을 확인해주세요","");
        this.SubopenModal = false;
      }
    }
  }

  onReset(){
    this.topMenu.top_menu_code = "";
    this.subMenu.sub_menu_code = "";
    this.topMenu.top_menu_target_url = "";
    this.topMenu.new_window_check = false;
    this.Deleteclick = true;
  }
}
