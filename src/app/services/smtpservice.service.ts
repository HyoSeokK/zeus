import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmtpService {

  private Uri : string = "http://localhost:3000/get/smtp";

  private saveUri : string = "http://localhost:3000/get/smtp";

  constructor(private http: HttpClient) { }

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
}
