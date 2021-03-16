import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private router:Router,) { }

  registerGroupKey(key : string) : any {
    console.log(key)
    this.router.navigateByUrl("/app/setting/group/register");
  }

  ngOnInit(): void {}
  
}
