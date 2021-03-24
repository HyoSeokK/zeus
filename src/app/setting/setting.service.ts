import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from  "@angular/common/http";
import { AUTH_BASE_URL, HTTP_OPTIONS } from '../utils/utils'
import { map } from 'rxjs/operators';
import { AdminInfo } from './user/user';

const authInfoEndpoint = AUTH_BASE_URL + "/auth_list"
const saveAuthEndpoint = AUTH_BASE_URL + "/save_auth"

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient:HttpClient) {}

    adminInfo : AdminInfo = new AdminInfo()

    authList() : any {

        return this.httpClient
            .post<HttpResponse<any>> (
                authInfoEndpoint,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    saveAuth(auth : AdminInfo) : any {

        return this.httpClient
        .post<HttpResponse<any>> (
            saveAuthEndpoint,
            auth,
            HTTP_OPTIONS
        ).pipe(map(res => {
            console.log(res)
            return res;
        }));
    }
}