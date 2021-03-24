import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User, UserAttribute, UserCredentials, AdminInfo } from '../../user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

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
    public userService : UserService,
    private fb: FormBuilder,
    private notifyservice: NotificationService) { 
      this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo;
      this.userForm = this.fb.group({
        userId : ['',[]],
        userFirstname : ['',[]],
        userLastName : ['',[]],
        userEmail : ['',[
          Validators.email,
          Validators.required
        ]],
        userDepartmentNm : ['',[]],
        userPosition : ['',[]],
        userPhoneNumber : ['',[]],
        password: ['', [
          Validators.required,
        ]],
        confirmPassword: ['', [
          Validators.required,
          passwordMatchValidator('password')
        ]]
      });

    }

    userForm = new FormGroup({
      userId : new FormControl(''),
      userFirstname : new FormControl(''),
      userLastName : new FormControl(''),
      userEmail : new FormControl(''),
      userDepartmentNm : new FormControl(''),
      userPosition : new FormControl(''),
      userPhoneNumber : new FormControl(''),
      password : new FormControl(''),
      confirmPassword : new FormControl(''),
    });

  ngOnInit(): void {}

  

  onSubmit() {
    
    this.groups.push("administrator")
    this.userInfo.username = this.userForm.controls.userId.value;
    this.userInfo.firstName = this.userForm.controls.userFirstname.value;
    this.userInfo.lastName = this.userForm.controls.userLastName.value;
    this.userInfo.email = this.userForm.controls.userEmail.value;
    this.userInfo.enabled = "true"
    this.userAttribute.departmentNm = this.userForm.controls.userDepartmentNm.value;
    this.userAttribute.position = this.userForm.controls.userPosition.value;
    this.userAttribute.phoneNumber = this.userForm.controls.userPhoneNumber.value;

    this.userCredentials.push(new UserCredentials("password", this.userForm.controls.password.value, true))
    this.userInfo.credentials = this.userCredentials;
    this.userInfo.attributes = this.userAttribute;

    this.userInfo.groups = this.groups

    
    if(this.userInfo.username != "" && this.userInfo.firstName != "" && this.userInfo.lastName != "" &&
      this.userAttribute.departmentNm != "" && this.userAttribute.position != "" && this.userInfo.email != "" && this.userForm.controls.password.value != "") {
        if(this.EmailCheck() == false){
          this.notifyservice.showWarning("이메일 형식이 맞지 않습니다.","")
        }else if(this.userForm.controls.password.value != this.userForm.controls.confirmPassword.value){
          this.notifyservice.showWarning("비밀번호를 확인해주세요.","")
        }
        else{
          console.log("Create User Json : " + JSON.stringify(this.userInfo));
          this.userService.createUser(this.userInfo, this.adminCli).subscribe(res=> {
            if(res.data == "") {
                this.notifyservice.showSuccess("등록 완료했습니다.", "관리자 등록")
                this.router.navigateByUrl("/app/setting/user/admin");
            } else {
                this.notifyservice.showError("등록 실패했습니다.", "관리자 등록")
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