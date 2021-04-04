import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from  "@angular/common/http";
import { GROUPS_BASE_URL, HTTP_OPTIONS } from '../../utils/utils'
import { map } from 'rxjs/operators';
import { AdminInfo } from '../user/user';
import { Groups, GroupsAttr } from './groups';

const groupsListEndpoint = GROUPS_BASE_URL + "/lt"
const groupsAttributeEndpoint = GROUPS_BASE_URL + "/putKey"
const deleteGroupsAttributeEndpoint = GROUPS_BASE_URL + "/deleteKey"

class postClass {
    groups : Groups;
    admin : AdminInfo;
}

@Injectable({
    providedIn: 'root'
})
export class GroupsService {

    postData : postClass = new postClass();

    groupObj : Groups = new Groups();
    groupAttrObj : GroupsAttr = new GroupsAttr("");

    constructor(private httpClient:HttpClient) {}
    
    groupList(admininfo : AdminInfo) : any {
        console.log("groupService : " + JSON.stringify(admininfo))
        this.postData.admin = admininfo
        return this.httpClient
            .post<HttpResponse<any>> (
                groupsListEndpoint+"/all",
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    groupListByName(admininfo : AdminInfo, groupName : string) : any {
        console.log("groupService : " + JSON.stringify(admininfo))
        this.postData.admin = admininfo
        return this.httpClient
            .post<HttpResponse<any>> (
                groupsListEndpoint+"/" + groupName,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    

    addAttribute(key : string, token : string, admininfo : AdminInfo) : any {
        this.groupObj.id = key
        this.groupObj.attributes = new GroupsAttr(token)

        console.log("group Object : " + JSON.stringify(this.groupObj))

        this.postData.groups = this.groupObj;
        this.postData.admin = admininfo;

        console.log("JSON.stringify(this.postData) : " + JSON.stringify(this.postData))
        return this.httpClient
            .post<HttpResponse<any>> (
                groupsAttributeEndpoint,
                this.postData,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }

    deleteAttribute(key:string, admininfo : AdminInfo) : any {
        this.groupObj.id = key

        console.log("group Object : " + JSON.stringify(this.groupObj))

        this.postData.groups = this.groupObj;
        this.postData.admin = admininfo;

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