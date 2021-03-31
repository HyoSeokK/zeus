import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User, UserAttribute, UserCredentials, AdminInfo } from '../../user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { THEME_ARRAY, ThemeInterface } from '../../../../services/theme';
import { ThemeService } from '../../../../services/app-theme.service'
import { clone } from '../../../../utils/utils'

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
  message: string;

  constructor(public userService : UserService,){}

  ngOnInit(): void {
    this.userService.currentMessage.subscribe(message => this.message = message)
    this.sendMessage()
  }
  sendMessage() {
    this.userService.sendMessage("Administrator");
  }
  
}