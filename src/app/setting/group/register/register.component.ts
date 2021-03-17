import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { GroupsService } from '../groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  url:SafeResourceUrl;
  id:string;
  tokenVal:string = "";

  constructor( 
    private router:Router,
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute,
    private groupsService:GroupsService, ) { 
      this.activatedRoute.params.subscribe(params =>{
        this.id=params['key']
        console.log("key : " + this.id)
      });
    }

  ngOnInit(): void {}

  registerToken() : void {
    console.log("token : " + this.tokenVal)

    this.groupsService.addAttribute(this.id, this.tokenVal).subscribe(res => {
      if(res.data == "") {
          console.log("Success User created")
          alert("등록했습니다.")
          this.router.navigateByUrl("/app/setting/group");
      } else {
          alert("등록 실패했습니다.")
          console.log("Failed Create USer");
      }
    });
  }
}
