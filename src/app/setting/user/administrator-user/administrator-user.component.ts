import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-user',
  templateUrl: './administrator-user.component.html',
  styleUrls: ['./administrator-user.component.css']
})
export class AdministratorUserComponent implements OnInit {

  constructor(private router:Router,) { }

  ngOnInit(): void {}

  goToRegisterUser(): void {
    this.router.navigateByUrl("/app/setting/user/admin/register");
  }

}
