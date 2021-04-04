import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { User, UserAttribute, AdminInfo } from '../../user';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';
import { KeycloakService } from 'keycloak-angular';

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
  fitstname : string = "";
  lastname : string = "";
  departNm : string[];
  position : string[];
  email : string = "";
  phoneNum : string[];

  desc : string;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public userService : UserService,
    private notifyservice: NotificationService,
    protected readonly keycloak: KeycloakService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.userid = params['id']
      console.log(this.userid)
    });

   }

  ngOnInit(): void {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 
    
    console.log("admin : " + JSON.stringify(this.adminCli))

    this.user.firstName = "";
    this.userService.updateUserInfo(this.userid, this.adminCli).subscribe(res=> {

      if(res.status == 200) {
        this.user = res.data as User
        this.userAttribute = this.user.attributes;

        console.log(JSON.stringify(this.user))
        console.log(JSON.stringify(this.userAttribute))

        this.username = this.user.firstName+this.user.lastName;
        
        this.fitstname = this.user.firstName;
        this.lastname = this.user.lastName;
        
        this.departNm = this.userAttribute.departmentNm;
        this.position = this.userAttribute.position;
        this.email = this.user.email;
        this.phoneNum = this.userAttribute.phoneNumber;
      } 

    });
  }

  updateBasicInfo() : void {
    console.log("user Update Info : " + JSON.stringify(this.user))

    this.user.firstName = this.fitstname;
    this.user.lastName = this.lastname;
    
    this.userAttribute.departmentNm = this.departNm
    this.userAttribute.position = this.position; 
    this.userAttribute.phoneNumber = this.phoneNum;

    
    this.user.email = this.email;
    

    this.user.attributes = this.userAttribute;

    this.userService.updateUser(this.user, this.adminCli).subscribe(res=> {
      if(res.data == "") {
          this.notifyservice.showSuccess("등록 완료했습니다.", "관리자 수정")
      } else {
        this.notifyservice.showError("등록 실패했습니다.", "관리자 수정")
      }

    });

  }

  updateCredentials() : void {

    this.userService.updateUserCredentials(this.userid, this.adminCli).subscribe(res=> {
      if(res.data == "") {
        this.notifyservice.showSuccess("메일을 확인해주세요.", "관리자 수정")
        this.keycloak.logout();
      } else {
        this.notifyservice.showError("삭제 실패했습니다.", "관리자 수정")
      }

    });

  }

}
