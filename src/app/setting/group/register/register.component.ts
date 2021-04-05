import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { GroupsService } from '../groups.service';
import { Router } from '@angular/router';
import { Groups } from '../groups';
import { AdminInfo } from '../../user/user';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  adminCli : AdminInfo = new AdminInfo();
  groups : Groups = new Groups();
  groupsList : Groups[];
  url:SafeResourceUrl;
  id:string;
  name:string;
  tokenVal:string = "";

  constructor( 
    private router:Router,
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute,
    private groupsService:GroupsService, 
    private notifyservice: NotificationService,) { 
      this.activatedRoute.params.subscribe(params =>{
        this.id=params['key']
        console.log("key : " + this.id)
      });
      
    }

  ngOnInit(): void {
    this.adminCli = JSON.parse(localStorage.getItem("cli")) as AdminInfo; 

    this.groupsService.groupList(this.adminCli).subscribe(res=> {

      if(res.status == 200) {
        this.groupsList = res.data as Groups[]
        console.log(this.groupsList)
        for(var i=0; i<this.groupsList.length; i++){
          if(this.id == this.groupsList[i].id){
            this.name = this.groupsList[i].name
            }
        }
      }
    });
    
    
  }

  registerToken() : void {
    console.log("token : " + this.tokenVal)

    this.groupsService.addAttribute(this.id, this.tokenVal, this.adminCli).subscribe(res => {
      if(res.data == "") {
          console.log("Success User created")
          this.notifyservice.showSuccess("권한 코드를 등록하였습니다.", "권한코드 관리")
          this.router.navigateByUrl("/app/setting/group");
      } else {
          this.notifyservice.showError("권한 코드를 등록을 실패하였습니다.", "권한코드 관리")
          console.log("Failed Create USer");
      }
    });
  }
}
