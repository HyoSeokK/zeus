import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse ,HttpParams } from  "@angular/common/http";
import { USER_BASE_URL, HTTP_OPTIONS, buildHttpRequestOption } from '../../utils/utils'
import { map } from 'rxjs/operators';
import { User, AdminInfo } from './user';

const createUserEndpoint = USER_BASE_URL + "/register_user"
const updateUserEndpoint = USER_BASE_URL + "/update_user"
const deleteUserEndpoint = USER_BASE_URL + "/delete_user"
const userListEndpoint = USER_BASE_URL + "/user_list"

class postClass {
    id : string;
    user : User;
    admin : AdminInfo;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    postData : postClass = new postClass();
    constructor(private httpClient:HttpClient) {}

    userList(admininfo : AdminInfo) : any {

        this.postData.admin = admininfo as AdminInfo;
        console.log("postData : " + JSON.stringify(this.postData))

        return this.httpClient
            .post<HttpResponse<any>> (
                userListEndpoint+"/all",
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


    updateUserInfo(userid : string, admininfo : AdminInfo) : any {

        return this.httpClient
            .post<HttpResponse<any>> (
                userListEndpoint+"/"+userid,
                admininfo,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    updateUser(userinfo : User, admininfo : AdminInfo) : any {
        this.postData.user = userinfo as User;
        this.postData.admin = admininfo as AdminInfo;
        
        console.log("postData : " + JSON.stringify(this.postData));

        return this.httpClient
            .post<HttpResponse<any>> (
                updateUserEndpoint,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));

    }

    deleteUser(userid, admininfo : AdminInfo) : any {
        this.postData.admin = admininfo as AdminInfo;
        
        return this.httpClient
            .post<HttpResponse<any>> (
                deleteUserEndpoint + "/" + userid,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));

    }
}