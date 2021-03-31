import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service'
import { NotificationService } from '../../../../services/notification.service';
import { GroupsService } from '../../../group/groups.service';
import { AdminInfo } from '../../user'
import { Groups } from '../../../group/groups'
import { italicIconName } from '@cds/core/icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  adminCli : AdminInfo = new AdminInfo();
  groups : Groups[];

  accessAuth : string = "";
  email : string = "";

  constructor(
    private userService : UserService,
    private notifyservice: NotificationService,
    private groupsService : GroupsService) {}

  ngOnInit(): void {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 
    this.groupsService.groupList(this.adminCli).subscribe(res=>{
      this.groups = res.data as Groups[]
      console.log("group res : " + JSON.stringify(this.groups))
      this.removeAuthName()
    })
  }

  removeAuthName() : void {
    this.groups = this.groups.filter(item => {return item.name !== "superadmin" && item.name !== "administrator"})
    
    console.log("group res : " + JSON.stringify(this.groups))
  }

  invitation() : void {
    console.log("accessAuth : " + this.accessAuth)
    this.userService.invitationUser(this.accessAuth, this.email).subscribe(res => {
      if(res.status == 200){
        this.notifyservice.showSuccess("초대 메일을 발송하였습니다.","개발자 초대");
      } else {
        this.notifyservice.showError("초대 메일 발송을 실패하였습니다.","개발자 초대");
      }
    });
  }
}
