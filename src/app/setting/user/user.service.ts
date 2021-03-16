import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from  "@angular/common/http";
import { USER_BASE_URL, HTTP_OPTIONS } from '../../utils/utils'
import { map } from 'rxjs/operators';
import { User, AdminInfo } from './user';

const createUserEndpoint = USER_BASE_URL + "/register_user"
const userListEndpoint = USER_BASE_URL + "/user_list"
const infoInitEndpoint = USER_BASE_URL + "/infoInit"

class postClass {
    user : User;
    admin : AdminInfo;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    postData : postClass = new postClass();
    constructor(private httpClient:HttpClient) {}

    infoInit(admininfo : AdminInfo) : any {
        
        return this.httpClient
            .post<HttpResponse<any>> (
                infoInitEndpoint,
                admininfo,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    userList(admininfo : AdminInfo) : any {
        
        return this.httpClient
            .post<HttpResponse<any>> (
                userListEndpoint,
                admininfo,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    createUser(userinfo : User, admininfo : AdminInfo) : any {
        
        this.postData.user = userinfo as User;
        this.postData.admin = admininfo as AdminInfo;
        
        console.log("postData : " + JSON.stringify(this.postData));

        return this.httpClient
            .post<HttpResponse<any>> (
                createUserEndpoint,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    
}