import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpResponse ,HttpParams } from  "@angular/common/http";
import { USER_BASE_URL, USERDEV_BASE_URL, SMTP_BASE_URL, HTTP_OPTIONS, buildHttpRequestOption } from '../../utils/utils'
import { map } from 'rxjs/operators';
import { User, AdminInfo } from './user';
import { smtpInfo } from '../smtp/smtpInfo'

const createDevEndpoint =  USERDEV_BASE_URL + "/register_user_dev"
const createAdminEndpoint = USER_BASE_URL + "/register_user"
const updateUserEndpoint = USER_BASE_URL + "/update_user"
const updateCredentailsUserEndpoint = USER_BASE_URL + "/update_userCredentials"
const deleteUserEndpoint = USER_BASE_URL + "/delete_user"
const userListEndpoint = USER_BASE_URL + "/user_list"

const userListByGroupTmpEndpoint = USERDEV_BASE_URL + "/userListByGroupTmp"
const acceptDevUser = USERDEV_BASE_URL + "/acceptDev"
const userListByGroupEndpoint = USER_BASE_URL + "/userListByGroup"
const invitationUserEndpoint = SMTP_BASE_URL + "/invitation"

class postClass {
    // admin user info
    id : string;
    user : User = new User();
    admin : AdminInfo = new AdminInfo();

    // dev user info
    devInfo : string;
    enabled : boolean;
    groupName : string;
    email : string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private messageSource = new BehaviorSubject<string>("");
    private accessAuthSource = new BehaviorSubject<string>("");
    private emailMessageSource = new BehaviorSubject<string>("");
    currentMessage = this.messageSource.asObservable();
    accessAuth = this.accessAuthSource.asObservable();
    emailMessage = this.emailMessageSource.asObservable();

    smtpInfo : smtpInfo = new smtpInfo();
    postData : postClass = new postClass();
    constructor(private httpClient:HttpClient) {}

    sendMessage(message: string) {
        this.messageSource.next(message);
    }
    sendAccessMessage(message: string) {
        this.accessAuthSource.next(message);
    }
    sendEmailMessage(message: string) {
        this.emailMessageSource.next(message);
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

    userListByGroupTmp(group : string) : any {
        this.postData = new postClass();
        console.log("postData : " + JSON.stringify(this.postData))
      
        return this.httpClient
            .post<HttpResponse<any>> (
                userListByGroupTmpEndpoint+"/"+group,
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

    acceptDevUser(email : string) : any {
        return this.httpClient
        .post<HttpResponse<any>> (
            acceptDevUser+"/"+email,
            this.postData,
            HTTP_OPTIONS
        ).pipe(map(res => {
            console.log(res)
            return res;
        }));
    }

    createDevUser(userinfo : string, enabled : boolean, groupName : string, email : string) : any {
        this.postData.devInfo = userinfo as string;
        this.postData.enabled = enabled;
        this.postData.groupName = groupName;
        this.postData.email = email;

        console.log("dev User : " + userinfo);

        return this.httpClient
            .post<HttpResponse<any>> (
                createDevEndpoint,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    createAdminUser(userinfo : User, admininfo : AdminInfo) : any {
        this.postData = new postClass();
        this.postData.user = userinfo as User;
        this.postData.admin = admininfo as AdminInfo;
        
        console.log("postData : " + JSON.stringify(this.postData));

        return this.httpClient
            .post<HttpResponse<any>> (
                createAdminEndpoint,
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
        
        console.log("userinfo : " + JSON.stringify(userinfo))
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