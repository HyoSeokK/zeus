import { Component, OnInit } from '@angular/core';

import { SmtpService } from '../../services/smtpservice.service' 
import { smtpInfo } from './smtpInfo';

@Component({
  selector: 'app-smtptest',
  templateUrl: './smtptest.component.html',
  styleUrls: ['./smtptest.component.css']
})

export class SmtptestComponent implements OnInit {
  smtpInfo: smtpInfo = new smtpInfo();
  constructor(private smtpservice: SmtpService) {
    
   }

  ngOnInit(): void {
  }
  onSubmit(){
    this.smtpservice.postSmtp(this.smtpInfo.AdminAddress,this.smtpInfo.SmtpAddress,this.smtpInfo.Port,
      this.smtpInfo.Password,this.smtpInfo.Authentication)
      .subscribe((resp) =>{
        console.log(resp);
      }
        
      )
  }
  
}
