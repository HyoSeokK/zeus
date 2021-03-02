import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpResponse, HttpParams } from  "@angular/common/http";
import { throwError as observableThrowError, of, Observable } from 'rxjs'; 
import { EnvSetting } from '../utils/utils.env';
import { buildHttpRequestOption, HTTP_OPTIONS, buildHttpRequestOptionsWithObserveResponse} from '../utils/utils'
import { map } from 'rxjs/operators';
import { BASE_URL} from '../utils/utils';

const changeThemeEndpoint = BASE_URL + "/changeTheme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  rst : string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpClient:HttpClient
  ) { }

  loadStyle(styleName: string) {
      const head = this.document.getElementsByTagName('head')[0];

      let themeLink = this.document.getElementById(
          'client-theme'
      ) as HTMLLinkElement;
      if (themeLink) {
          themeLink.href = styleName;
      } else {
          const style = this.document.createElement('link');
          style.id = 'client-theme';
          style.rel = 'stylesheet';
          style.href = `${styleName}`;
          
          head.appendChild(style);
      }
  }

  updateTheme() : any {
    console.log("change function")
    var env = JSON.parse(localStorage.getItem('env')) as EnvSetting;

    return this.httpClient
        .post<HttpResponse<any>>(
            changeThemeEndpoint, 
            env,
            HTTP_OPTIONS
        ).pipe(map(res=>{
            return res;
        }));
  }

}
