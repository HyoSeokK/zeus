import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TargetService } from './target-menu.service';

@Component({
  selector: 'app-target-menu',
  templateUrl: './target-menu.component.html',
  styleUrls: ['./target-menu.component.css']
})
export class TargetMenuComponent implements OnInit {

  url : string = "";
  topCode : string = "";
  subCode : string = "";

  constructor(
    private activatedRoute:ActivatedRoute, 
    private targetService:TargetService) {
      
    this.activatedRoute.params.subscribe(params =>{
      this.topCode = params['topCode']
      this.subCode = params['subCode']
      
    })
   }

  ngOnInit(): void {
    this.targetService.getTargetUrlLink(this.topCode, this.subCode).subscribe(res=>{
      this.url = res.data as string;
      console.log("this url : " + this.url)
    });
  }

}
