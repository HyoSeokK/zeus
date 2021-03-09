import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer-user',
  templateUrl: './developer-user.component.html',
  styleUrls: ['./developer-user.component.css']
})
export class DeveloperUserComponent implements OnInit {

  constructor(private router:Router,) { }

  ngOnInit(): void {
  }

  goToRegisterUser() : void {
    this.router.navigateByUrl("/app/setting/user/developer/register");
  }
}
