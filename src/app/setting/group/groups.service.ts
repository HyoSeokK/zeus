import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from  "@angular/common/http";
import { GROUPS_BASE_URL, HTTP_OPTIONS } from '../../utils/utils'
import { map } from 'rxjs/operators';
import { AdminInfo } from '../user/user';
import { Groups, GroupsAttr } from './groups';

const groupsListEndpoint = GROUPS_BASE_URL + "/lt"
const groupsAttributeEndpoint = GROUPS_BASE_URL + "/putKey"
const deleteGroupsAttributeEndpoint = GROUPS_BASE_URL + "/deleteKey"

@Injectable({
    providedIn: 'root'
})
export class GroupsService {

    groupObj : Groups = new Groups();
    groupAttrObj : GroupsAttr = new GroupsAttr("");

    constructor(private httpClient:HttpClient) {}

    groupList(admininfo : AdminInfo) : any {
        
        return this.httpClient
            .post<HttpResponse<any>> (
                groupsListEndpoint,
                admininfo,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    addAttribute(key : string, token : string) : any {
        this.groupObj.id = key
        this.groupObj.attributes = new GroupsAttr(token)

        console.log("group Object : " + JSON.stringify(this.groupObj))

        return this.httpClient
            .post<HttpResponse<any>> (
                groupsAttributeEndpoint,
                this.groupObj,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    deleteAttribute(key:string) : any {
        this.groupObj.id = key

        console.log("group Object : " + JSON.stringify(this.groupObj))

        return this.httpClient
            .post<HttpResponse<any>> (
                deleteGroupsAttributeEndpoint,
                this.groupObj,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }
    
}