import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

export class RequestQueryParams extends HttpParams {
    constructor() {
      super();
    }
}

export interface HttpOptionInterface {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: 'json';
    withCredentials?: boolean;
}