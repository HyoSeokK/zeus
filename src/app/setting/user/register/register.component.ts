import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserAttribute, UserCredentials } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInfo : User = new User();
  userAttribute : UserAttribute = new UserAttribute();
  userCredentials : UserCredentials[] = new Array<UserCredentials>();

  constructor(public userService : UserService) { console.log("adfsdf")}

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
    this.userInfo.username = this.userForm.controls.userId.value
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

    console.log("Create User Json : " + JSON.stringify(this.userInfo));
  
    this.userService.createUser(this.userInfo).subscribe(res=> {
      if(res.status == 201) {
        console.log("Success User created")
      } else {
        console.log("Failed Create USer");
      }
    });
  }


}
