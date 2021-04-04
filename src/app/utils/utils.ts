import { Observable } from "rxjs";

import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpOptionInterface, RequestQueryParams } from './RequestQueryParams'

export const BASE_URL = "/api";
export const SMTP_BASE_URL = BASE_URL+"/smtp";
export const USERDEV_BASE_URL = BASE_URL+"/dev";
export const USER_BASE_URL = BASE_URL+"/admin";
export const MENU_BASE_URL = BASE_URL+"/menu";
export const GROUPS_BASE_URL = BASE_URL+"/groups";
export const AUTH_BASE_URL = BASE_URL+"/auth";

export const HTTP_OPTIONS: HttpOptionInterface = {
    headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Cache-Control": 'no-cache',
        "Pragma": 'no-cache'
    }),
    responseType: 'json'
};

export function buildHttpRequestOption(params: HttpParams) : HttpOptionInterface {
    let reqOptions: HttpOptionInterface = {
        headers: new HttpHeaders({
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Cache-Control": 'no-cache',
            "Pragma": 'no-cache'
        }),
        responseType: 'json'
    };

    if (params) {
        reqOptions.params = params;
    }
    console.log("reqOptions : " + JSON.stringify(reqOptions))
    return reqOptions;
}

export function buildHttpRequestOptionsWithObserveResponse(params: RequestQueryParams): HttpOptionInterface {
    let reqOptions: HttpOptionInterface = {
        headers: new HttpHeaders({
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Cache-Control": 'no-cache',
            "Pragma": 'no-cache'
        }),
        responseType: 'json',
        observe: 'response' as 'body'
    };
    if (params) {
        reqOptions.params = params;
    }
    return reqOptions;
}

export function clone(srcObj: any): any {
    if (!srcObj) { return null; }
    return JSON.parse(JSON.stringify(srcObj));
}
export class Util {}