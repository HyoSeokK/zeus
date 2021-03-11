import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-administrator-user',
  templateUrl: './administrator-user.component.html',
  styleUrls: ['./administrator-user.component.css']
})
export class AdministratorUserComponent implements OnInit {

  constructor(
    private router:Router,
    public userService : UserService) { }

  ngOnInit(): void {
    this.userService.userList().subscribe(res=> {
      if(res.status == 201) {
        console.log("Success User created")
      } else {
        console.log("Failed Create USer");
      }
    });
  }

  goToRegisterUser(): void {
    this.router.navigateByUrl("/app/setting/user/admin/register");
  }

}
