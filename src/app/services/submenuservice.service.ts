import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from  "@angular/common/http";
import { subMenu } from '../setting/menu/submenu'
import { throwError as observableThrowError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { buildHttpRequestOptionsWithObserveResponse} from '../utils/utils'

@Injectable({
  providedIn: 'root'
})
export class SubmenuserviceService {

  private saveUri : string = "http://localhost:3000/get/submenusave";

  constructor(private http: HttpClient) { }

  public getSubMenu(){
    let params = new HttpParams();
    return this.http.get<HttpResponse<subMenu[]>>(
      "/get/submenu"
      ,buildHttpRequestOptionsWithObserveResponse(params)
    )
    .pipe(
      catchError(error => observableThrowError(error)),);
  }

  
  public saveSubMenu(sub_menu_name:string,top_menu_code:string,sub_menu_order:string){
    return this.http.post(this.saveUri,JSON.stringify({
      'top_menu_code':top_menu_code, 'sub_menu_name':sub_menu_name,
      'sub_menu_order':sub_menu_order
    }),
    ).pipe(
      catchError(error => observableThrowError(error))
    );
  }
}
