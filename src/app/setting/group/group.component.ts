import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminInfo } from '../user/user';
import { GroupsService } from './groups.service';
import { Groups } from './groups';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router:Router, private groupService:GroupsService) { }

  adminCli : AdminInfo = new AdminInfo();
  groups : Groups = new Groups();
  groupsList : Groups[];

  registerGroupKey(key : string) : any {
    this.router.navigateByUrl("/app/setting/group/register/"+key);
  }

  ngOnInit(): void {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 

    this.groupService.groupList(this.adminCli).subscribe(res=> {

      if(res.status == 200) {
        this.groupsList = res.data as Groups[]
        console.log(this.groupsList)
      }
    });
  }
  
}
