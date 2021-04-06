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
  ckDisabled : boolean = false;
  adminCli : AdminInfo = new AdminInfo();
  groupsList : Groups[];
  groupInfo : Groups = new Groups();
  userInfoTmpList : User[];
  userInfoList : User[] = [];
  groupId : string;
  groupName : string;
  disabled : boolean = false;
  selected : true;
  user : User = new User();
  userAttribute : UserAttribute = new UserAttribute();
  username : string;
  isSvcAll: boolean = false;

  constructor(
    private router:Router,
    private groupService:GroupsService,
    private userService:UserService,
    private notifyservice: NotificationService,) {}

  ngOnInit(): void {
    // loading administrator group member
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo;
    this.groupService.groupList(this.adminCli).subscribe(res=> {
      if(res.status == 200) {
          let tmp = res.data as Groups[]
          this.groupsList = tmp.filter(item => {return item.name !== "superadmin" && item.name !== "administrator"})
          console.log("grouplist" + JSON.stringify(this.groupsList))
          this.groupInfo = this.groupsList[0] as Groups;
          this.groupId = this.groupInfo.id;
          this.groupName = this.groupInfo.name;
          this.loadUserByGroup(this.groupId, this.groupName)
      }
    });
  }

  changeValueGroup(event:any) {
    console.log(event)
    let groupInfo = event.split('/')
    this.groupId = groupInfo[0]
    this.groupName = groupInfo[1]
    this.loadUserByGroup(this.groupId, this.groupName)
  }

  loadUserByGroup(group : any, groupname : any) {
    this.userInfoList = []
    
    this.userService.userListByGroupTmp(groupname).subscribe(res=>{
      if(res != null) {
        console.log("tmp res : " + JSON.stringify(res))
        this.userInfoList = this.userInfoList.concat(res as User);
      }
    });

    this.userService.userListByGroup(this.adminCli, group).subscribe(res=> {
      if(res.status == 200) {
        let userListByGroup = res.data as User[]
        console.log("userListByGroup : " + JSON.stringify(userListByGroup))
        for(var i=0; i<userListByGroup.length; i++){
          var datetime = new Date(userListByGroup[i].createdTimestamp)
          userListByGroup[i].convertcreatedTimestamp = datetime.getUTCFullYear() + "-" + ("00" + (datetime.getMonth() + 1)).slice(-2) + "-" + datetime.getDate()+ " "
          + datetime.getHours() + ":" +("00" + datetime.getMinutes()).slice(-2);
        } 
        this.userInfoList = this.userInfoList.concat(userListByGroup);

        console.log("userInfo : " + JSON.stringify(this.userInfoList))
         
      }
    });
  }

  acceptUser(user : any) : void {
    console.log("acceptUser :" + JSON.stringify(user))
    user.enabled = true;
    this.userService.createAdminUser(user, this.adminCli).subscribe(res=> {
      if(res.data == "" || res.status == 200) {
        console.log("create dev user : " + JSON.stringify(res))
        this.updateTmpUser(user.email)
        
      } else {
        this.notifyservice.showError("등록 실패했습니다.", "개발자 등록")
      }
    });
  }

  updateTmpUser(email : string) : void  {
    
    this.userService.acceptDevUser(email).subscribe(res=> {
      console.log("updateTmpUser : " + JSON.stringify(res))
      
      if(res.status == 200) {
        this.notifyservice.showSuccess("등록 완료했습니다.", "개발자 등록")
        this.loadUserByGroup(this.groupId, this.groupName)
      } else {
        this.notifyservice.showError("등록 실패했습니다.", "개발자 등록")
      }
    });
  }

  onClickDisableUser() {
    console.log("onClickckc")
    this.notifyservice.showSuccess("등록된 사용자만 선택 가능합니다.", "개발자 등록")
  }

  onClickUserInfo(isChecked: boolean, index: number) : void {
    console.log(isChecked, index)
    this.userInfoList.forEach(userList => {
      userList.checked = false;
    });

    this.userInfoList[index].checked = isChecked;
    this.isSvcAll = this.userInfoList.every(_v => _v.checked);

    console.log("isSvcAll : " + this.isSvcAll)
    if (isChecked == true)
      this.check = false;
    if (isChecked == false)
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
        this.loadUserByGroup(this.groupId, this.groupName)
      }

    });

  }

  goToRegisterUser() : void {
    this.router.navigateByUrl("/app/setting/user/developer/register");
  }

}
