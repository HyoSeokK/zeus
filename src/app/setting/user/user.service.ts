import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from  "@angular/common/http";
import { USER_BASE_URL, HTTP_OPTIONS } from '../../utils/utils'
import { map } from 'rxjs/operators';
import { User } from './user';

const createUserEndpoint = USER_BASE_URL + "/register_user"
const userListEndpoint = USER_BASE_URL + "/user_list"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient:HttpClient) {}
    
    createUser(user : User) : any {

        return this.httpClient
            .post<HttpResponse<any>> (
                createUserEndpoint,
                user,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    userList() : any {
        return this.httpClient
            .post<HttpResponse<any>> (
                userListEndpoint,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }
}