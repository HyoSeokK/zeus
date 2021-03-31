import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpResponse ,HttpParams } from  "@angular/common/http";
import { USER_BASE_URL, SMTP_BASE_URL, HTTP_OPTIONS, buildHttpRequestOption } from '../../utils/utils'
import { map } from 'rxjs/operators';
import { User, AdminInfo } from './user';
import { smtpInfo } from '../smtp/smtpInfo'

const authInfoEndpoint = "/auth_list"
const createUserEndpoint = USER_BASE_URL + "/register_user"
const updateUserEndpoint = USER_BASE_URL + "/update_user"
const updateCredentailsUserEndpoint = USER_BASE_URL + "/update_userCredentials"
const deleteUserEndpoint = USER_BASE_URL + "/delete_user"
const userListEndpoint = USER_BASE_URL + "/user_list"
const userListByGroupEndpoint = USER_BASE_URL + "/userListByGroup"
const invitationUserEndpoint = SMTP_BASE_URL + "/invitation"

class postClass {
    id : string;
    user : User = new User();
    admin : AdminInfo = new AdminInfo();
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private messageSource = new BehaviorSubject<string>("");
    private accessAuthSource = new BehaviorSubject<string>("");
    currentMessage = this.messageSource.asObservable();
    accessAuth = this.accessAuthSource.asObservable();

    smtpInfo : smtpInfo = new smtpInfo();
    postData : postClass = new postClass();
    constructor(private httpClient:HttpClient) {}

    sendMessage(message: string) {
        this.messageSource.next(message);
    }
    sendAccessMessage(message: string) {
        this.accessAuthSource.next(message);
    }

    userList(admininfo : AdminInfo) : any {
        this.postData = new postClass();
        this.postData.admin = admininfo as AdminInfo;
        console.log("postData : " + JSON.stringify(this.postData))

        return this.httpClient
            .post<HttpResponse<any>> (
                userListEndpoint+"/all",
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    userListByGroup(admininfo : AdminInfo, group : string) : any {
        this.postData = new postClass();
        this.postData.admin = admininfo as AdminInfo;
        console.log("postData : " + JSON.stringify(this.postData))
      
        return this.httpClient
            .post<HttpResponse<any>> (
                userListByGroupEndpoint+"/"+group+"/members",
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    createUser(userinfo : User, admininfo : AdminInfo) : any {
        this.postData = new postClass();
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

// 사용자 수정 시 기본 정보
    updateUserInfo(userid : string, admininfo : AdminInfo) : any {
        this.postData = new postClass();
        this.postData.admin = admininfo as AdminInfo;
        
        console.log("postData : " + JSON.stringify(this.postData));

        return this.httpClient
            .post<HttpResponse<any>> (
                userListEndpoint+"/"+userid,
                this.postData,
                HTTP_OPTIONS,
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    // 사용자 수정
    updateUser(userinfo : User, admininfo : AdminInfo) : any {
        this.postData = new postClass();
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

    updateUserCredentials(userid : string, admininfo : AdminInfo) : any {
        this.postData = new postClass();
        this.postData.admin = admininfo as AdminInfo;
        
        console.log("postData : " + JSON.stringify(this.postData));

        return this.httpClient
            .post<HttpResponse<any>> (
                updateCredentailsUserEndpoint + "/" + userid,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));

    }


    deleteUser(userid : string, admininfo : AdminInfo) : any {
        this.postData = new postClass();
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

    invitationUser(auth : string, email : string) : any {
        this.smtpInfo.AccessAuth = auth;
        this.smtpInfo.InvitationAddress = email;

        return this.httpClient
            .post<HttpResponse<any>> (
                invitationUserEndpoint,
                this.smtpInfo,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }
}