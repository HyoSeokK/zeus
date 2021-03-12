import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TargetService } from './target-menu.service';

@Component({
  selector: 'app-target-menu',
  templateUrl: './target-menu.component.html',
  styleUrls: ['./target-menu.component.css']
})
export class TargetMenuComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute, 
    private targetService:TargetService) {
      
    this.activatedRoute.params.subscribe(params =>{
      let topCode = params['topCode']
      let subCode = params['subCode']

      targetService.getTargetUrlLink(topCode, subCode).subscribe(res=>{
        
      });
    })
   }

  ngOnInit(): void {
    
  }

}
