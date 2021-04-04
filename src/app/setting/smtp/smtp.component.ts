import { Component, OnInit } from '@angular/core';

import { SmtpService } from '../../services/smtpservice.service' 
import { smtpInfo } from './smtpInfo';
import {NotificationService} from '../../services/notification.service'

@Component({
  selector: 'app-smtptest',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.css']
})

export class SmtptestComponent implements OnInit {
  click : boolean = true;

  smtpInfo: smtpInfo[]

  constructor(private smtpservice: SmtpService,
    private notifyservice: NotificationService
    ) {
    
   }

  ngOnInit(): void {
    this.smtpservice.getSmtp()
    .subscribe(resp => {
      this.smtpInfo = resp.body as smtpInfo[]
      this.smtpInfo[0].Password = "";
    })
    
  }
  onTest(){
    if(this.EmailCheck() == false){
      this.notifyservice.showWarning("입력값을 확인해주세요","")
    }else{
    this.smtpservice.postSmtp(this.smtpInfo[0].AdminAddress,this.smtpInfo[0].SmtpAddress,this.smtpInfo[0].Port,
      this.smtpInfo[0].Password)
      .subscribe(() =>{
        this.notifyservice.showSuccess("연결 테스트에 성공되었습니다","");
        this.click = false;
      },
      error => {
        console.log(error)
        this.notifyservice.showWarning("입력값을 확인해주세요","");
      }     
        
      )
    }
  }

  onSave(){
    this.smtpservice.saveSmtp(this.smtpInfo[0].AdminAddress,this.smtpInfo[0].SmtpAddress,this.smtpInfo[0].Port,
      this.smtpInfo[0].Password)
      .subscribe(() =>{
        this.notifyservice.showSuccess("입력정보가 저장 되었습니다","");
        this.ngOnInit();

      },
      error => {
        console.log(error)
        this.notifyservice.showError("입력정보 저장에 실패하였습니다","");
      }     
        
      )
      
  }

  onSend(){
    this.smtpservice.sendSmtp(this.smtpInfo[0].AdminAddress,this.smtpInfo[0].SmtpAddress,this.smtpInfo[0].Port,
      this.smtpInfo[0].Password)
      .subscribe(() =>{
        this.notifyservice.showSuccess("메일이 전송 되었습니다","");
        this.ngOnInit();

      },
      error => {
        console.log(error)
        this.notifyservice.showError("메일 전송에 실패하였습니다","");
      }     
        
      )
  }

  onReset(){
    this.smtpInfo[0].AdminAddress = "";
    this.smtpInfo[0].SmtpAddress = "";
    this.smtpInfo[0].Password = "";
  }
  
  EmailCheck():boolean{
    var check:boolean;

    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    check = regexp.test(this.smtpInfo[0].AdminAddress);

    return check
  }
}
