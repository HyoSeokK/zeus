import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from  "@angular/common/http";
import { topMenu } from '../setting/menu/topmenu'
import { topMenuIcon } from '../setting/menu/topmenuicon'
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { buildHttpRequestOptionsWithObserveResponse, HTTP_OPTIONS} from '../utils/utils'
import { MENU_BASE_URL } from '../utils/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopmenuserviceService {

  private getTopMenuUri : string = MENU_BASE_URL + "/topmenu";
  private getTopMenuIconUri : string = MENU_BASE_URL + "/topmenuicon";
  private saveUri : string = MENU_BASE_URL + "/topmenusave";
  private deleteUri : string = MENU_BASE_URL + "/topmenudelete";
  private saveTopUrl : string = MENU_BASE_URL + "/topmenusaveUrl";
  private deleteTopUrl : string = MENU_BASE_URL + "/topmenudeleteUrl";
  private updateTopUrl : string = MENU_BASE_URL + "/topmenuupdate";
  /* topMenu: topMenu[]; */
 

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
  /* async getTopMenu() : Promise<Observable<topMenu[]>> {
    return this.http
    .get(this.getTopMenuUri,HTTP_OPTIONS)
    .pipe(map(resp => {
      this.topMenu = resp as topMenu[]
      return this.topMenu;
    }))
    
  } */

  public getTopMenuIcon(){
    let params = new HttpParams();
    return this.http.get<HttpResponse<topMenuIcon[]>>(
      this.getTopMenuIconUri
      ,buildHttpRequestOptionsWithObserveResponse(params)
    )
    .pipe(
      catchError(error => observableThrowError(error)),);
  }

  public saveTopMenu(top_menu_name:string,top_menu_code:string,top_menu_order:string,icon_code:string) : any{
    return this.http.post(this.saveUri,JSON.stringify({
      'top_menu_code':top_menu_code, 'top_menu_name':top_menu_name,
      'top_menu_order':top_menu_order, 'icon_code':icon_code
    }),
    ).pipe(
      map(result => {
        return result;
      })
    );
  }

  public updateTopMenu(top_menu_name:string,top_menu_code:string,top_menu_order:string,icon_code:string) : any{
    return this.http.post(this.updateTopUrl,JSON.stringify({
      'top_menu_code':top_menu_code,  'top_menu_name':top_menu_name,
      'top_menu_order':top_menu_order, 'icon_code':icon_code
    }),
    ).pipe(
      map(result => {
        return result;
      })
    )
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

  public saveTopUrlLink(top_menu_code:string,top_menu_target_url:string,new_window:string){
    return this.http.post(this.saveTopUrl,JSON.stringify({
      'top_menu_code':top_menu_code, 'top_menu_target_url':top_menu_target_url,
      'new_window':new_window
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    );
  }

  public deleteTopUrlLink(top_menu_code:string,top_menu_target_url:string){
    return this.http.post(this.deleteTopUrl,JSON.stringify({
      'top_menu_code':top_menu_code, 'top_menu_target_url':top_menu_target_url
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    )
  }

  
}
