import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from  "@angular/common/http";
import { subMenu } from '../setting/menu/submenu'
import { throwError as observableThrowError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { buildHttpRequestOptionsWithObserveResponse} from '../utils/utils'

import {MENU_BASE_URL} from '../utils/utils';
@Injectable({
  providedIn: 'root'
})
export class SubmenuserviceService {

  private saveUri : string = MENU_BASE_URL + "/submenusave";
  private deleteUri : string = MENU_BASE_URL + "/submenudelete";

  constructor(private http: HttpClient) { }

  public getSubMenu(){
    let params = new HttpParams();
    return this.http.get<HttpResponse<subMenu[]>>(
      MENU_BASE_URL + "/submenu"
      ,buildHttpRequestOptionsWithObserveResponse(params)
    )
    .pipe(
      catchError(error => observableThrowError(error)),);
  }

  
  public saveSubMenu(sub_menu_code:string,sub_menu_name:string,top_menu_code:string,sub_menu_order:string){
    return this.http.post(this.saveUri,JSON.stringify({
      'sub_menu_code':sub_menu_code, 'sub_menu_name':sub_menu_name,
      'top_menu_code':top_menu_code, 'sub_menu_order':sub_menu_order
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    );
  }

  public deleteSubMenu(sub_menu_code:string,sub_menu_name:string,top_menu_code:string,sub_menu_order:string){
   return this.http.post(this.deleteUri,JSON.stringify({
      'sub_menu_code':sub_menu_code, 'sub_menu_name':sub_menu_name,
      'top_menu_code':top_menu_code, 'sub_menu_order':sub_menu_order
   }),
   ).pipe(
    catchError(error => observableThrowError(error))
   )
  }
}
