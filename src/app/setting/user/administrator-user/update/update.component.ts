import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { User, UserAttribute, UserCredentials, AdminInfo } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class AdminUpdateComponent implements OnInit {

  userid : string = "";

  adminCli : AdminInfo = new AdminInfo();

  user : User = new User();
  userAttribute : UserAttribute = new UserAttribute();

  username : string;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public userService : UserService
  ) {
    
    this.activatedRoute.params.subscribe(params => {
      this.userid = params['id']
      console.log(this.userid)
    });

   }

  ngOnInit(): void {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 
    
    console.log("admin : " + JSON.stringify(this.adminCli))

    this.userService.updateUserInfo(this.userid, this.adminCli).subscribe(res=> {

      if(res.status == 200) {
        this.user = res.data as User
        this.userAttribute = this.user.attributes;

        console.log(this.userAttribute)

        this.username = this.user.firstName+this.user.lastName;
        
      } 

      
    });
  }

  updateBasicInfo() : void {
    console.log("user Update Info : " + JSON.stringify(this.user))
    this.userService.updateUser(this.user, this.adminCli).subscribe(res=> {
      console.log("update ")

      if(res.data == "") {
          console.log("Success Update created")
          
          this.router.navigateByUrl("/app/setting/user/admin");
      } else {
          alert("실패했습니다.")
          console.log("Failed Update USer");
      }

    });

  }

  updateCredentials() : void {
    
  }

}
