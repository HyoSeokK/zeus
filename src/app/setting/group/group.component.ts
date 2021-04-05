import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminInfo } from '../user/user';
import { GroupsService } from './groups.service';
import { Groups } from './groups';
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(
    private router:Router, 
    private groupService:GroupsService,
    private notifyservice: NotificationService,) { }

  adminCli : AdminInfo = new AdminInfo();
  groups : Groups = new Groups();
  groupsList : Groups[];

  registerGroupKey(key : string) : any {
    this.router.navigateByUrl("/app/setting/group/register/"+key);
  }
  deleteGroupKey(key : string) : any {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 
    this.groupService.addAttribute(key, "", this.adminCli).subscribe(res => {
      if(res.data == "") {
          this.notifyservice.showSuccess("권한 코드를 삭제했습니다.", "권한코드 관리")
          this.groupList();
      } else {
        this.notifyservice.showError("권한 코드를 삭제를 실패하였습니다.", "권한코드 관리")
          console.log("Failed Create USer");
      }
    });
  }

  groupList () {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 

    console.log("this admincli : " + JSON.stringify(this.adminCli))
    this.groupService.groupList(this.adminCli).subscribe(res=> {

      console.log("group res : " + JSON.stringify(res))
      if(res.status == 502 || res.status == false) {
        console.log(res.message)
        return
      }

      if(res.status == 200) {
        this.groupsList = res.data as Groups[]
        console.log(this.groupsList)
      }
    });
  }
  ngOnInit(): void {
    this.groupList();
  }
  
}
