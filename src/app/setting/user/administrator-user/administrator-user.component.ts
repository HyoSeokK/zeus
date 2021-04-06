import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../user.service';
import { User, AdminInfo } from '../user';
import { GroupsService } from '../../group/groups.service';
import { Groups } from '../../group/groups';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-administrator-user',
  templateUrl: './administrator-user.component.html',
  styleUrls: ['./administrator-user.component.css']
})
export class AdministratorUserComponent implements OnInit {
  check = true;
  user : User = new User();
  userInfoList : User[]
  adminCli : AdminInfo = new AdminInfo();
  userInfo : User = new User();
  groupsList : Groups[]
  isSvcAll: boolean = false;

  constructor(
    private router:Router,
    public userService : UserService,
    public groupService : GroupsService,
    private notifyservice: NotificationService,) {
      this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo;

      // loading administrator group member
      this.groupService.groupListByName(this.adminCli, "administrator").subscribe(res=> {
        if(res.status == 200) {
            this.groupsList = res.data as Groups[]
            console.log("grouplist" + JSON.stringify(this.groupsList))
            this.loadUserList()
        }
      });
    }

  ngOnInit(): void {}

  loadUserList() : void {
    this.userService.userListByGroup(this.adminCli, this.groupsList[0].id).subscribe(res=> {

      if(res.status == 200) {
        this.userInfoList = res.data as User[]   
      } else {

      }
       
    });
  }
  goToRegisterUser(): void {
    this.router.navigateByUrl("/app/setting/user/admin/register");
  }

  onClickUserInfo(isChecked: boolean, index: number) : void {
    this.userInfoList.forEach(userList => {
      userList.checked = false;
    });

    this.userInfoList[index].checked = isChecked;
    this.isSvcAll = this.userInfoList.every(_v => _v.checked);

    console.log("isSvcAll : " + this.isSvcAll)
    if (isChecked == true)
      this.check = false;
    if (isChecked == false)
      this.check = true;
  }

  updateUser() : void {
    this.userInfoList.forEach(userList => {
      if (userList.checked)
        this.router.navigateByUrl("/app/setting/user/admin/update/"+userList.id);
    });
  }

  deleteUser() : void {
    let userId : string;

    this.userInfoList.forEach(userList => {
      if (userList.checked)
        userId = userList.id
    });

    this.userService.deleteUser(userId, this.adminCli).subscribe(res => {
      console.log("res : " + res)
      if (res.status == 200) {
        this.notifyservice.showSuccess("관리자를 삭제했습니다.", "관리자 관리")
        this.loadUserList()
      }

    });

  }

}
