import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable, of } from "rxjs";
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { buildHttpRequestOptionsWithObserveResponse, SMTP_BASE_URL } from '../utils/utils';
import {smtpInfo} from '../setting/smtp/smtpInfo'

@Injectable({
  providedIn: 'root'
})
export class SmtpService {

  private Uri : string = SMTP_BASE_URL + "/register_smtp";

  private saveUri : string = SMTP_BASE_URL + "/smtpsave";

  private smtpGetUri : string = SMTP_BASE_URL + "/smtpget";

  private sendMailUri : string = SMTP_BASE_URL + "/sendmail";

  constructor(private http: HttpClient) { }

  public getSmtp() {
    let params = new HttpParams();
    return this.http.get<HttpResponse<smtpInfo[]>>(
      this.smtpGetUri
      ,buildHttpRequestOptionsWithObserveResponse(params)
    )
    .pipe(
      catchError(error => observableThrowError(error)),
    );
  }

  public postSmtp(AdminAddress:string,SmtpAddress: string, Port: string, Password: string) {
    return this.http.post(this.Uri,JSON.stringify({
      'AdminAddress':AdminAddress, 'SmtpAddress':SmtpAddress,'Port':Port,
          'Password':Password
    }),
    ).pipe(
      catchError(error => observableThrowError(error)),);
    
    
  }

  public saveSmtp(AdminAddress:string,SmtpAddress: string, Port: string, Password: string) {
    return this.http.post(this.saveUri,JSON.stringify({
      'AdminAddress':AdminAddress, 'SmtpAddress':SmtpAddress,'Port':Port,
          'Password':Password
    }),
    ).pipe(
      catchError(error => observableThrowError(error)),);
    
    
  }

  public sendSmtp(AdminAddress:string,SmtpAddress: string, Port: string, Password: string) {
    return this.http.post(this.sendMailUri,JSON.stringify({
      'AdminAddress':AdminAddress, 'SmtpAddress':SmtpAddress,'Port':Port,
          'Password':Password
    }),
    ).pipe(
      catchError(error => observableThrowError(error)),);
    
    
  }
}
