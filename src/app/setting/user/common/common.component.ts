import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User, UserAttribute, UserCredentials, AdminInfo } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { THEME_ARRAY, ThemeInterface } from '../../../services/theme';
import { ThemeService } from '../../../services/app-theme.service'
import { clone } from '../../../utils/utils'


function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'common-register',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
 
  userInfo : User = new User();
  userAttribute : UserAttribute = new UserAttribute();
  userCredentials : UserCredentials[] = new Array<UserCredentials>();
  adminCli : AdminInfo = new AdminInfo();
  groups : string[] = [];
  mode : string;
  themeArray: ThemeInterface[] = clone(THEME_ARRAY);
  regiMode: string;
  accessAuth : string;

  constructor(
    private router:Router,
    public userService : UserService,
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute, 
    private notifyservice: NotificationService,
    public theme:ThemeService) { 
      
      this.userService.currentMessage.subscribe(message => {
        this.regiMode = message
        console.log("this message : " + this.regiMode)
      });

      this.userService.accessAuth.subscribe(message => {
        this.accessAuth = message;
        console.log("access Mode  : " + this.accessAuth)
      })
      
      this.activatedRoute.params.subscribe(params =>{
        this.mode = params['mode']
        if(this.mode === "invitation") {
          let styleMode = 'LIGHT'

          this.themeArray.forEach((themeItem) => {
              if (themeItem.showStyle === styleMode) {
                this.theme.loadStyle(themeItem.currentFileName);
              }
          });
        }
      })

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

    if (this.regiMode != "Invitation") 
      this.groups.push("administrator")
    else
      this.groups.push(this.accessAuth)
    
    this.userInfo.username = this.userForm.controls.userId.value;
    this.userInfo.firstName = this.userForm.controls.userFirstname.value;
    this.userInfo.lastName = this.userForm.controls.userLastName.value;
    this.userInfo.email = this.userForm.controls.userEmail.value;
    
    if (this.regiMode == "Invitation") 
      this.userInfo.enabled = false
    else
      this.userInfo.enabled = true
    
    if(this.userInfo.username != "" && this.userInfo.firstName != "" && this.userInfo.lastName != "" &&
      this.userAttribute.departmentNm[0] != "" && this.userAttribute.position[0] != "" && this.userInfo.email != "" && this.userForm.controls.password.value != "") {
        if(this.EmailCheck() == false){
          this.notifyservice.showWarning("이메일 형식이 맞지 않습니다.","")
        }else if(this.userForm.controls.password.value != this.userForm.controls.confirmPassword.value){
          this.notifyservice.showWarning("비밀번호를 확인해주세요.","")
        }
        else{
          this.userAttribute.departmentNm.push(this.userForm.controls.userDepartmentNm.value);
          this.userAttribute.position.push(this.userForm.controls.userPosition.value);
          this.userAttribute.phoneNumber.push(this.userForm.controls.userPhoneNumber.value);

          this.userCredentials.push(new UserCredentials("password", this.userForm.controls.password.value, true))
          this.userInfo.credentials = this.userCredentials;
          this.userInfo.attributes = this.userAttribute;

          this.userInfo.groups = this.groups
          console.log("Create User Json : " + JSON.stringify(this.userInfo));
          this.userService.createUser(this.userInfo, this.adminCli).subscribe(res=> {
            console.log("res : " + JSON.stringify(res))

            if(res.data !=""){
              var datacheck = JSON.parse(res.data)
            }

            if(res.status == 400) {
              this.notifyservice.showError("등록 실패했습니다.", "관리자 등록")
              this.userInfo  = new User();
              this.userAttribute = new UserAttribute();
              this.userCredentials = new Array<UserCredentials>();
            }

            if(res.data == "" || res.status == 200) {
                this.notifyservice.showSuccess("등록 완료했습니다.", "관리자 등록")
                
                if (this.regiMode == "Invitation") {
                  this.notifyservice.showSuccess("관리자 등록 수락 후 사용하세요.", "개발자 등록")
                } else{
                  this.router.navigateByUrl("/app/setting/user/admin");
                }
            } else if(datacheck.errorMessage == "User exists with same username"){
                this.notifyservice.showError("등록 실패했습니다. ID를 확인해주세요", "관리자 등록")
                this.userInfo  = new User();
                this.userAttribute = new UserAttribute();
                this.userCredentials = new Array<UserCredentials>(); 
            } else if(datacheck.errorMessage == "User exists with same email"){
              this.notifyservice.showError("등록 실패했습니다. Email을 확인해주세요", "관리자 등록")
              this.userInfo  = new User();
              this.userAttribute = new UserAttribute();
              this.userCredentials = new Array<UserCredentials>();
            } else if(res.data!=""&&res.stats!=500){
              this.notifyservice.showError("등록 실패했습니다.", "관리자 등록")
              this.userInfo  = new User();
              this.userAttribute = new UserAttribute();
              this.userCredentials = new Array<UserCredentials>();
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