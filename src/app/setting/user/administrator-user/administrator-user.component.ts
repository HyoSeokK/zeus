import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User, AdminInfo } from '../user';
import { GroupsService } from '../../group/groups.service';
import { Groups } from '../../group/groups';

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
  
  constructor(
    private router:Router,
    public userService : UserService,
    public groupService : GroupsService) {
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
        for(var i=0; i<this.userInfoList.length; i++){
          var datetime = new Date(this.userInfoList[i].createdTimestamp)
          this.userInfoList[i].convertcreatedTimestamp = datetime.getUTCFullYear() + "-" + ("00" + (datetime.getMonth() + 1)).slice(-2) + "-" + datetime.getDate()+ " "
          + datetime.getHours() + ":" +("00" + datetime.getMinutes()).slice(-2);
        }   
      } else {

      }
       
    });
  }
  goToRegisterUser(): void {
    this.router.navigateByUrl("/app/setting/user/admin/register");
  }

  onClickUserInfo() : void {
    
    let cnt = 0;
    this.userInfoList.forEach(userList => {
      if (userList.checked)
        cnt++;
    });

    if (cnt >= 1)
      this.check = false;
    if (cnt == 0) 
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
        this.loadUserList()
      }

    });

  }

}
