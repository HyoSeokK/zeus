import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TargetService } from './target-menu.service';

@Component({
  selector: 'app-target-menu',
  templateUrl: './target-menu.component.html',
  styleUrls: ['./target-menu.component.css']
})
export class TargetMenuComponent implements OnInit {

  url:SafeResourceUrl;
  topCode : string = "";
  subCode : string = "";

  constructor(
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute, 
    private targetService:TargetService) {
      
    this.activatedRoute.params.subscribe(params =>{
      this.topCode = params['topCode']
      this.subCode = params['subCode']

      if(this.subCode == "" || this.subCode == null) {
        console.log("top menu")
        this.loadTopIframeUrl()
      } else {
        console.log("sub menu")
        this.loadSubIframeUrl()
      }
      
    })
  }
  
   loadTopIframeUrl() {
      this.targetService.getTargetTopUrlLink(this.topCode).subscribe(res =>{
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(res.data);
      })
   }

   loadSubIframeUrl() {
      this.targetService.getTargetUrlLink(this.topCode, this.subCode).subscribe(res=>{
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(res.data);
      });
   }

  ngOnInit(): void {}

}
