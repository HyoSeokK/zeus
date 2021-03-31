import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserAttribute, AdminInfo } from '../user';
import { GroupsService } from '../../group/groups.service';
import { Groups } from '../../group/groups';
import { UserService } from '../user.service'
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-developer-user',
  templateUrl: './developer-user.component.html',
  styleUrls: ['./developer-user.component.css']
})
export class DeveloperUserComponent implements OnInit{
  check = true;
  adminCli : AdminInfo = new AdminInfo();
  groupsList : Groups[];
  groupInfo : Groups = new Groups();
  userInfoList : User[];
  groupName : string;
  disabled : boolean = false;
  selected : true;
  user : User = new User();
  userAttribute : UserAttribute = new UserAttribute();
  username : string;

  constructor(
    private router:Router,
    private groupService:GroupsService,
    private userService:UserService,
    private notifyservice: NotificationService,) {
      console.log("constro")
    }

  ngOnInit(): void {
    console.log("ngONInit")
    // loading administrator group member
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo;
    this.groupService.groupList(this.adminCli).subscribe(res=> {
      if(res.status == 200) {
          let tmp = res.data as Groups[]
          this.groupsList = tmp.filter(item => {return item.name !== "superadmin" && item.name !== "administrator"})
          console.log("grouplist" + JSON.stringify(this.groupsList))
          this.groupInfo = this.groupsList[0] as Groups;
          this.loadUserByGroup(this.groupInfo.id)
          this.groupName = this.groupInfo.id;
      }
    });
  }

  changeValueGroup(event:any) : string {
    console.log(event)
    this.groupName = event.id;
    this.loadUserByGroup(event.id)
    return this.groupName
  }

  loadUserByGroup(group : string) {
    this.userService.userListByGroup(this.adminCli, group).subscribe(res=> {
      if(res.status == 200) {
        this.userInfoList = res.data as User[]
        console.log("userInfo : " + JSON.stringify(this.userInfoList))
        for(var i=0; i<this.userInfoList.length; i++){
          var datetime = new Date(this.userInfoList[i].createdTimestamp)
          this.userInfoList[i].convertcreatedTimestamp = datetime.getUTCFullYear() + "-" + ("00" + (datetime.getMonth() + 1)).slice(-2) + "-" + datetime.getDate()+ " "
          + datetime.getHours() + ":" +("00" + datetime.getMinutes()).slice(-2);
        }   
      }
    });
  }

  acceptUser(user : string) : void {
    console.log("user:" + user)
    this.userService.updateUserInfo(user, this.adminCli).subscribe(res=> {

      if(res.status == 200) {
        this.user = res.data as User
        this.userAttribute = this.user.attributes;

        console.log(this.userAttribute)

        this.username = this.user.firstName+this.user.lastName;
        this.user.enabled = true
        this.updateBasicInfo()
      } 
    });
  }

  updateBasicInfo() : void {
    console.log("user Update Info : " + JSON.stringify(this.user))
    this.userService.updateUser(this.user, this.adminCli).subscribe(res=> {
      if(res.data == "") {
          this.notifyservice.showSuccess("등록 완료했습니다.", "개발자 등록")
          this.loadUserByGroup(this.groupName)
      } else {
        this.notifyservice.showError("등록 실패했습니다.", "개발자 등록")
      }

    });

  }

  onClickUserInfo() : void {
    
    let cnt = 0;
    this.userInfoList.forEach(userList => {
      if (userList.checked)
        cnt++;
    });

    if (cnt >= 1)
      this.check = false;
    if (cnt == 0) 
      this.check = true;
  }

  updateUser() : void {
    this.userInfoList.forEach(userList => {
      if (userList.checked)
        this.router.navigateByUrl("/app/setting/user/admin/update/"+userList.id);
    });
  }

  deleteUser() : void {
    let userId : string;

    this.userInfoList.forEach(userList => {
      if (userList.checked)
        userId = userList.id
    });

    this.userService.deleteUser(userId, this.adminCli).subscribe(res => {
      console.log("res : " + res)
      if (res.status == 200) {
        this.loadUserByGroup(this.groupName)
      }

    });

  }

  goToRegisterUser() : void {
    this.router.navigateByUrl("/app/setting/user/developer/register");
  }

}
