import {  Component, OnInit } from '@angular/core';

import {TopmenuserviceService} from '../../services/topmenuservice.service'
import {SubmenuserviceService} from '../../services/submenuservice.service'
import {topMenu} from './topmenu'
import {subMenu} from './submenu'
import {topMenuIcon} from './topmenuicon'
import { AppLayoutComponent } from 'src/app/base/layout/app-layout';
import {NotificationService} from '../../services/notification.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  TopDeleteclick : boolean = true;
  SubDeleteclick : boolean = true;
  save : boolean = false;
  update : boolean = true;
  topMenu: topMenu = new topMenu();
  subMenu: subMenu = new subMenu();
  topMenuInfo: topMenu = new topMenu();
  subMenuInfo: subMenu = new subMenu();
  topMenuIcon: topMenuIcon[]
  topMenuCodeList : topMenu[]
  TopMenuList : topMenu[]
  SubMenuList : subMenu[]
  TopMenuobj : topMenu = new topMenu();
  SubMenuobj : subMenu = new subMenu();
  TopMenuAddList : Array<topMenu>=new Array<topMenu>();
  SubMenuAddList : Array<subMenu>=new Array<subMenu>();
  TopopenModal = false;
  SubopenModal = false;
  

  constructor(private topmenuservice: TopmenuserviceService,
    private submenuservice: SubmenuserviceService,
    private notifyservice: NotificationService,
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
    var check = 0;
    this.TopMenuobj = new topMenu();
    this.TopMenuobj.top_menu_code = this.topMenu.top_menu_code
    for(var i = 0; i<this.TopMenuList.length; i++){
      if(this.TopMenuobj.top_menu_code == this.TopMenuList[i].top_menu_code){
          this.notifyservice.showWarning("이미 존재하는 TopMenuCode입니다","");
          check = 0;
          break;
        }else {
          check = 1;
    }
  }
    this.TopMenuobj.top_menu_name = this.topMenu.top_menu_name
    this.TopMenuobj.top_menu_order = this.topMenu.top_menu_order
    for(var i = 0; i<this.topMenuIcon.length; i++){
      if(this.topMenu.icon_code == this.topMenuIcon[i].icon_description){
        this.TopMenuobj.icon_code = this.topMenuIcon[i].icon_code
      }
    }

    if (check == 1){
      if(this.TopMenuobj.top_menu_code != null && this.TopMenuobj.top_menu_name != null && this.TopMenuobj.top_menu_order != null && this.TopMenuobj.icon_code != null){
          this.TopMenuList.push(this.TopMenuobj);
          this.TopMenuAddList.push(this.TopMenuobj);
          for (var i = 0; i<this.TopMenuAddList.length; i++){
            this.topmenuservice.saveTopMenu(this.TopMenuAddList[i].top_menu_name,this.TopMenuAddList[i].top_menu_code,
              this.TopMenuAddList[i].top_menu_order,this.TopMenuAddList[i].icon_code)
              .subscribe(result => {
                if(result.data != null){
                  this.notifyservice.showSuccess("입력정보가 저장 되었습니다","");
                  this.ngOnInit();
                  this.onTopReset();
                }
              },
              error => {
                this.notifyservice.showError("입력정보 저장에 실패하였습니다","");
                console.log(error)
                this.ngOnInit();
                this.onTopReset();
              }
              )
            } 
          
      }
      else {
        console.log(check)
        this.notifyservice.showWarning("입력값을 확인해주세요","");
      }
    }
   
  }

  onSubMenuSave(){
    var check = 0;
    this.SubMenuobj = new subMenu();
    this.SubMenuobj.sub_menu_code = this.subMenu.sub_menu_code

    for (var i = 0; i<this.SubMenuList.length; i++){
      if(this.SubMenuobj.sub_menu_code == this.SubMenuList[i].sub_menu_code){
        this.notifyservice.showWarning("이미 존재하는 SubMenuCode입니다","");
        check = 0;
        break;
      }else {
        check = 1;
      }
    }
    this.SubMenuobj.sub_menu_name = this.subMenu.sub_menu_name
    for(var i = 0; i<this.topMenuCodeList.length; i++){
      if(this.subMenu.top_menu_code == this.topMenuCodeList[i].top_menu_name){
        this.SubMenuobj.top_menu_code = this.topMenuCodeList[i].top_menu_code
      }
    }
    this.SubMenuobj.sub_menu_order = this.subMenu.sub_menu_order
    for(var i = 0; i<this.topMenuIcon.length; i++){
      if(this.subMenu.icon_code == this.topMenuIcon[i].icon_description){
        this.SubMenuobj.icon_code = this.topMenuIcon[i].icon_code
      }
    }
    for(var i = 0; i<this.topMenuCodeList.length; i++){
      if(this.subMenu.top_menu_code == this.topMenuCodeList[i].top_menu_name){
        this.SubMenuobj.top_menu_name = this.topMenuCodeList[i].top_menu_name
      }
    }
    
    
    if(check == 1){
      if(this.SubMenuobj.top_menu_code != null && this.SubMenuobj.sub_menu_name != null && this.SubMenuobj.sub_menu_order != null
        && this.SubMenuobj.sub_menu_code != null && this.SubMenuobj.icon_code != null){
            this.SubMenuList.push(this.SubMenuobj);
            this.SubMenuAddList.push(this.SubMenuobj);
            for(var i = 0; i<this.SubMenuAddList.length; i++){
              this.submenuservice.saveSubMenu(this.SubMenuAddList[i].sub_menu_code,this.SubMenuAddList[i].sub_menu_name,this.SubMenuAddList[i].top_menu_code,
              this.SubMenuAddList[i].top_menu_name,this.SubMenuAddList[i].sub_menu_order,this.SubMenuAddList[i].icon_code)
              .subscribe(result => {
                if(result.data != null){ 
                  this.notifyservice.showSuccess("입력정보가 저장 되었습니다","");
                  this.onSubReset()
                  this.ngOnInit();
                }
              },
              error => {
                this.notifyservice.showError("입력정보 저장에 실패하였습니다","");
                console.log(error)
                this.ngOnInit()
                this.onSubReset()
              }
              ) 
            }
       }else{
        this.notifyservice.showWarning("입력값을 확인해주세요","");
      }
    }
  }

  onTopMenuGet(topMenu){
    this.topMenuInfo = topMenu
    this.topMenu.top_menu_code = this.topMenuInfo.top_menu_code
    this.topMenu.top_menu_name = this.topMenuInfo.top_menu_name
    this.topMenu.top_menu_order = this.topMenuInfo.top_menu_order
    for(var i = 0; i < this.topMenuIcon.length; i++){
      if(this.topMenuInfo.icon_code == this.topMenuIcon[i].icon_code)
        this.topMenu.icon_code = this.topMenuIcon[i].icon_description
      }
    this.TopDeleteclick = false;
  }

  onSubMenuGet(subMenu){
    this.subMenuInfo = subMenu
    this.subMenu.sub_menu_name = this.subMenuInfo.sub_menu_name
    this.subMenu.sub_menu_code = this.subMenuInfo.sub_menu_code
    this.subMenu.sub_menu_order = this.subMenuInfo.sub_menu_order
    for(var i = 0; i< this.topMenuCodeList.length; i++){
      if(this.subMenuInfo.top_menu_code == this.topMenuCodeList[i].top_menu_code)
      this.subMenu.top_menu_code = this.topMenuCodeList[i].top_menu_name
    }
    for(var i = 0; i< this.topMenuIcon.length; i++){
      if(this.subMenuInfo.icon_code == this.topMenuIcon[i].icon_code)
        this.subMenu.icon_code = this.topMenuIcon[i].icon_description
    }
    this.SubDeleteclick = false;
  }

  onTopOpenModal() {
    if(this.topMenu.top_menu_code == ""){
      this.notifyservice.showWarning("입력값을 확인해주세요","")
    }else{
      this.onTopModal()
    }
  }

  onSubOpenModal() {
    if(this.subMenu.sub_menu_code == ""){
      this.notifyservice.showWarning("입력값을 확인해주세요","")
    }else{
      this.onSubModal()
    }
  }

  onTopModal(){
    this.TopopenModal = true;
  }

  onSubModal(){
    this.SubopenModal = true;
  }

  onTopMenuDelete() {
    var check = 0;
    if(this.topMenu.top_menu_name != null && this.topMenu.top_menu_code != null && this.topMenu.top_menu_order != null && this.topMenu.icon_code !=null){
        if(this.topMenuInfo.top_menu_code != this.topMenu.top_menu_code){
          this.notifyservice.showWarning("존재하지 않는 TopMenuCode 입니다.","");
          check = 0;
          this.TopopenModal = false;
        }else{
          check = 1;
        }

      if(check == 1){
        this.topmenuservice.deleteTopMenu(this.topMenu.top_menu_name,this.topMenu.top_menu_code,this.topMenu.top_menu_order,this.topMenu.icon_code)
        .subscribe(() => { 
          this.notifyservice.showSuccess("입력정보가 삭제 되었습니다","");
          this.ngOnInit();
          this.onTopReset();
          this.TopopenModal = false;
        },
        error => {
          console.log(error)
          this.notifyservice.showError("입력정보 삭제에 실패하였습니다","");
          this.TopopenModal = false;
        }
        )
      }
    }
    else{
      this.notifyservice.showWarning("입력값을 확인해주세요","");
      this.TopopenModal = false;
    }
  }

  onSubMenuDelete() {
    var check =0;
    if(this.subMenu.sub_menu_code != null && this.subMenu.sub_menu_name != null && this.subMenu.top_menu_code != null && this.subMenu.sub_menu_order != null){
      if(this.subMenuInfo.sub_menu_code != this.subMenu.sub_menu_code){
        this.notifyservice.showWarning("존재하지 않는 SubMenuCode 입니다.","");
        check =0;
        this.SubopenModal = false;
      }else{
        check = 1;
      }
      if(check == 1){
        for(var i = 0; i<this.topMenuCodeList.length; i++){
          if(this.subMenu.top_menu_code == this.topMenuCodeList[i].top_menu_name){
            this.subMenu.top_menu_code = this.topMenuCodeList[i].top_menu_code
          }
        }
        if (this.subMenuInfo.top_menu_code != this.subMenu.top_menu_code){
          this.notifyservice.showWarning("맞지 않는 TopMenuCode 입니다.","");
          this.SubopenModal = false;
          this.onSubReset();
        }else{
      this.submenuservice.deleteSubMenu(this.subMenu.sub_menu_code,this.subMenu.sub_menu_name,this.subMenu.top_menu_code,
        this.subMenu.sub_menu_order,this.subMenu.icon_code)
        .subscribe(() => {
          this.notifyservice.showSuccess("입력정보가 삭제 되었습니다","");
          this.ngOnInit();
          this.onSubReset();
          this.SubopenModal = false;
        },
        error => {
          console.log(error)
          this.notifyservice.showError("입력정보 삭제에 실패하였습니다","");
          this.SubopenModal = false;
        }
        )
      }
    }
      }
      else{
        this.notifyservice.showWarning("입력값을 확인해주세요","");
        this.SubopenModal = false;
      }
    }

    onTopReset(){
      this.topMenu.top_menu_code = "";
      this.topMenu.top_menu_name = "";
      this.topMenu.top_menu_order = "";
      this.topMenu.icon_code = "";
      this.TopDeleteclick = true;
    }

    onSubReset(){
      this.subMenu.sub_menu_name = "";
      this.subMenu.sub_menu_code = "";
      this.subMenu.top_menu_code = "";
      this.subMenu.sub_menu_order = "";
      this.subMenu.icon_code = "";
      this.SubDeleteclick = true;
    }
    
    onTopCancel(){
      this.topMenu.top_menu_code = "";
      this.topMenu.top_menu_name = "";
      this.topMenu.top_menu_order = "";
      this.topMenu.icon_code = "";
      this.TopDeleteclick = true;
    }

    onSubCancel(){
      this.subMenu.sub_menu_name = "";
      this.subMenu.sub_menu_code = "";
      this.subMenu.top_menu_code = "";
      this.subMenu.sub_menu_order = "";
      this.subMenu.icon_code = "";
      this.SubDeleteclick = true;
    }
}
