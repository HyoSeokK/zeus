import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserAttribute, UserCredentials, AdminInfo } from '../../user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import {NotificationService} from '../../../../services/notification.service'

@Component({
  selector: 'admin-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userInfo : User = new User();
  userAttribute : UserAttribute = new UserAttribute();
  userCredentials : UserCredentials[] = new Array<UserCredentials>();
  adminCli : AdminInfo = new AdminInfo();
  groups : string[] = [];
  /* userId : string
  userFirstname : string
  userLastName : string
  userEmail : string
  userDepartmentNm : string
  userPosition : string
  userPhoneNumber : string
  password : string
  passwordcheck : string
 */
  constructor(
    private router:Router,
    private notifyservice:NotificationService,
    public userService : UserService) { 
      this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 
    }

  

  /* userForm = new FormGroup({
    userId : new FormControl(''),
    userFirstname : new FormControl(''),
    userLastName : new FormControl(''),
    userEmail : new FormControl(''),
    userDepartmentNm : new FormControl(''),
    userPosition : new FormControl(''),
    userPhoneNumber : new FormControl(''),
    password : new FormControl(''),
    passwordcheck : new FormControl(''), 
  }); */

  ngOnInit(): void {
   
  }

  onSubmit() {
    if(this.userInfo.username != null && this.userInfo.password != null && this.userInfo.firstName != null && this.userInfo.lastName != null &&
      this.userAttribute.departmentNm != null && this.userAttribute.position != null && this.userInfo.email != null){
    if(this.userInfo.password != this.userInfo.passwordcheck){
      this.notifyservice.showWarning("비밀번호를 확인해주세요","")
    }
    else if(this.EmailCheck() == false){
      this.notifyservice.showWarning("이메일 형식이 맞지 않습니다.","")
    }else {

    
    this.groups.push("administrator")
    /* this.userInfo.username = this.userId
    this.userInfo.firstName = this.userFirstname
    this.userInfo.lastName = this.userLastName
    this.userInfo.email = this.userEmail
    this.userInfo.enabled = "true"
    this.userAttribute.departmentNm = this.userDepartmentNm
    this.userAttribute.position = this.userPosition
    this.userAttribute.phoneNumber = this.userPhoneNumber */

    this.userCredentials.push(new UserCredentials("password", this.userInfo.password, true))
    this.userInfo.credentials = this.userCredentials;
    this.userInfo.attributes = this.userAttribute;

    this.userInfo.groups = this.groups

    console.log("Create User Json : " + JSON.stringify(this.userInfo));
  
    this.userService.createUser(this.userInfo, this.adminCli).subscribe(res=> {
      
      if(res.data == "") {
          console.log("Success User created")
          this.notifyservice.showSuccess("관리자를 등록했습니다","")
          this.router.navigateByUrl("/app/setting/user/admin");
      } else {
          this.notifyservice.showError("관리자 등록에 실패했습니다.","")
          console.log("Failed Create USer");
      }
    });
  }
  }
  else{
    this.notifyservice.showWarning("입력값을 확인해주세요","")
  }
  }

  EmailCheck():boolean{
    var check:boolean;

    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    check = regexp.test(this.userInfo.email);

    return check
  }
}
