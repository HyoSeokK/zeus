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

  user : User = new User();
  userInfoList : User[]
  adminCli : AdminInfo = new AdminInfo();

  constructor(
    private router:Router,
    public userService : UserService) {}

  ngOnInit(): void {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 

    this.userService.userList(this.adminCli).subscribe(res=> {

      if(res.status == 200) {
        this.userInfoList = res.data as User[]
        console.log(this.userInfoList)
      }
    });
  }

  goToRegisterUser(): void {
    this.router.navigateByUrl("/app/setting/user/admin/register");
  }

}
