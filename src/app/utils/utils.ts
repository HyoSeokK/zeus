import { Observable } from "rxjs";

import { HttpHeaders } from '@angular/common/http';
import { HttpOptionInterface } from './RequestQueryParams'

export const BASE_URL = "/api";

export const HTTP_GET_OPTIONS: HttpOptionInterface = {
    headers: new HttpHeaders({
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Cache-Control": 'no-cache',
        "Pragma": 'no-cache'
    }),
    responseType: 'json'
};

export function buildHttpRequestOptionsWithObserveResponse(): HttpOptionInterface {
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
    return reqOptions;
}

export function clone(srcObj: any): any {
    if (!srcObj) { return null; }
    return JSON.parse(JSON.stringify(srcObj));
}
export class Util {}