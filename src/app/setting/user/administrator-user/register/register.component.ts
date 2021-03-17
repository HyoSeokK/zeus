import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserAttribute, UserCredentials, AdminInfo } from '../../user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

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

  constructor(
    private router:Router,
    public userService : UserService) { 
      this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 
    }

  ngOnInit(): void {}

  userForm = new FormGroup({
    userId : new FormControl(''),
    userFirstname : new FormControl(''),
    userLastName : new FormControl(''),
    userEmail : new FormControl(''),
    userDepartmentNm : new FormControl(''),
    userPosition : new FormControl(''),
    userPhoneNumber : new FormControl(''),
  });

  onSubmit() {
    this.groups.push("admin")
    this.userInfo.username = this.userForm.controls.userId.value;
    this.userInfo.firstName = this.userForm.controls.userFirstname.value;
    this.userInfo.lastName = this.userForm.controls.userLastName.value;
    this.userInfo.email = this.userForm.controls.userEmail.value;
    this.userInfo.enabled = "true"
    this.userAttribute.departmentNm = this.userForm.controls.userDepartmentNm.value;
    this.userAttribute.position = this.userForm.controls.userPosition.value;
    this.userAttribute.phoneNumber = this.userForm.controls.userPhoneNumber.value;

    this.userCredentials.push(new UserCredentials("password", "1234", true))
    this.userInfo.credentials = this.userCredentials;
    this.userInfo.attributes = this.userAttribute;

    this.userInfo.groups = this.groups

    console.log("Create User Json : " + JSON.stringify(this.userInfo));
  
    this.userService.createUser(this.userInfo, this.adminCli).subscribe(res=> {
      
      if(res.data == "") {
          console.log("Success User created")
          alert("관리자를 등록했습니다.")
          this.router.navigateByUrl("/app/setting/user/admin");
      } else {
          alert("관리자를 등록 실패했습니다.")
          console.log("Failed Create USer");
      }
    });
  }
}
