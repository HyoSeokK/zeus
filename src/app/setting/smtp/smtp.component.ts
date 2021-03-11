import { Component, OnInit } from '@angular/core';

import { SmtpService } from '../../services/smtpservice.service' 
import { smtpInfo } from './smtpInfo';
import  {Router } from '@angular/router';

@Component({
  selector: 'app-smtptest',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.css']
})

export class SmtptestComponent implements OnInit {
  click : boolean = true;

  smtpInfo: smtpInfo[]

  constructor(private smtpservice: SmtpService, private router:Router) {
    
   }

  ngOnInit(): void {
    this.smtpservice.getSmtp()
    .subscribe(resp => {
      this.smtpInfo = resp.body as smtpInfo[]
      this.smtpInfo[0].Password = "";
    })
    
  }
  onSubmit(){
    this.smtpservice.postSmtp(this.smtpInfo[0].AdminAddress,this.smtpInfo[0].SmtpAddress,this.smtpInfo[0].Port,
      this.smtpInfo[0].Password)
      .subscribe(() =>{
        alert("테스트 성공")
        this.click = false;
      },
      error => {
        console.log(error)
        alert("테스트 실패")
      }     
        
      )
      
  }

  onSave(){
    this.smtpservice.saveSmtp(this.smtpInfo[0].AdminAddress,this.smtpInfo[0].SmtpAddress,this.smtpInfo[0].Port,
      this.smtpInfo[0].Password)
      .subscribe(() =>{
        alert("저장 성공")
        this.router.navigateByUrl("/app/setting")
      },
      error => {
        console.log(error)
        alert("저장 실패")
      }     
        
      )
      
  }
  
}
