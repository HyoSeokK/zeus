import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from  "@angular/common/http";
import { topMenu } from '../setting/menu/topmenu'
import { topMenuIcon } from '../setting/menu/topmenuicon'
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { buildHttpRequestOptionsWithObserveResponse} from '../utils/utils'
import {MENU_BASE_URL} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class TopmenuserviceService {

  private getTopMenuUri : string = MENU_BASE_URL + "/topmenu";
  private getTopMenuIconUri : string = MENU_BASE_URL + "/topmenuicon"
  private saveUri : string = MENU_BASE_URL + "/topmenusave";
  private deleteUri : string = MENU_BASE_URL + "/topmenudelete";
  private saveTopUrl : string = MENU_BASE_URL + "/topmenusaveUrl";
 

  constructor(private http: HttpClient) { }

  public getTopMenu(){
    let params = new HttpParams();
    return this.http.get<HttpResponse<topMenu[]>>(
      this.getTopMenuUri
      ,buildHttpRequestOptionsWithObserveResponse(params)
    )
    .pipe(
      catchError(error => observableThrowError(error)),);  
  }

  public getTopMenuIcon(){
    let params = new HttpParams();
    return this.http.get<HttpResponse<topMenuIcon[]>>(
      this.getTopMenuIconUri
      ,buildHttpRequestOptionsWithObserveResponse(params)
    )
    .pipe(
      catchError(error => observableThrowError(error)),);
  }

  public saveTopMenu(top_menu_name:string,top_menu_code:string,top_menu_order:string,icon_code:string){
    return this.http.post(this.saveUri,JSON.stringify({
      'top_menu_code':top_menu_code, 'top_menu_name':top_menu_name,
      'top_menu_order':top_menu_order, 'icon_code':icon_code
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    );
  }

  public deleteTopMenu(top_menu_name:string,top_menu_code:string,top_menu_order:string,icon_code:string){
    return this.http.post(this.deleteUri,JSON.stringify({
      'top_menu_code':top_menu_code, 'top_menu_name':top_menu_name,
      'top_menu_order':top_menu_order, 'icon_code':icon_code
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    );
  }

  public saveTopUrlLink(top_menu_code:string,top_menu_target_url:string,new_window:boolean){
    return this.http.post(this.saveTopUrl,JSON.stringify({
      'top_menu_code':top_menu_code, 'top_menu_target_url':top_menu_target_url,
      'new_window':new_window
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    );
  }

  
}
