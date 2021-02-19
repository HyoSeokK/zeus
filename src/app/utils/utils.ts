import { Observable } from "rxjs";

import { HttpHeaders } from '@angular/common/http';
import { HttpOptionInterface } from './RequestQueryParams'

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

export class Util {}