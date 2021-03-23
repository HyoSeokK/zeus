import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User, AdminInfo } from '../user';


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

  constructor(
    private router:Router,
    public userService : UserService) {}

  ngOnInit(): void {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 
    this.loadUserList()
    
  }

  loadUserList() : void {
    this.userService.userList(this.adminCli).subscribe(res=> {

      if(res.status == 200) {
        this.userInfoList = res.data as User[]
        console.log(this.userInfoList)
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
