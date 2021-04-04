import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpResponse ,HttpParams } from  "@angular/common/http";
import { USER_BASE_URL, SMTP_BASE_URL, HTTP_OPTIONS, buildHttpRequestOption } from '../utils/utils'
import { map } from 'rxjs/operators';
import { AdminInfo } from '../setting/user/user';

const connectionCkEndpoint = "/connCk"

class postClass {
    admin : AdminInfo = new AdminInfo();
}

@Injectable({
    providedIn: 'root'
})
export class KeycloakApiCommonService {
    
    postData : postClass = new postClass();
    constructor(private httpClient:HttpClient) {}

    connectionCk(admininfo : AdminInfo) : any {
        console.log("connectionCk : " + JSON.stringify(admininfo))
        
        this.postData.admin = admininfo
        return this.httpClient
            .post<HttpResponse<any>> (
                connectionCkEndpoint,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }
}