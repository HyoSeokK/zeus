import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from  "@angular/common/http";
import { topMenu } from '../setting/menu/topmenu'
import { throwError as observableThrowError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { buildHttpRequestOptionsWithObserveResponse} from '../utils/utils'

@Injectable({
  providedIn: 'root'
})
export class TopmenuserviceService {

  private saveUri : string = "http://localhost:3000/get/topmenusave";

  constructor(private http: HttpClient) { }

  public getTopMenu(){
    let params = new HttpParams();
    return this.http.get<HttpResponse<topMenu[]>>(
      "/get/topmenu"
      ,buildHttpRequestOptionsWithObserveResponse(params)
    )
    .pipe(
      catchError(error => observableThrowError(error)),);  
  }

  public saveTopMenu(top_menu_name:string,top_menu_code:string,top_menu_order:string){
    return this.http.post(this.saveUri,JSON.stringify({
      'top_menu_code':top_menu_code, 'top_menu_name':top_menu_name,
      'top_menu_order':top_menu_order
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    );
  }
}
