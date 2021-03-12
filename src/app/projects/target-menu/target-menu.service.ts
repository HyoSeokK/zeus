import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from  "@angular/common/http";
import { MENU_BASE_URL, HTTP_OPTIONS } from '../../utils/utils'
import { map } from 'rxjs/operators';

const getTargetUrlLink = MENU_BASE_URL + "/target"

class RequestCode {
    top_menu_code: string;
    sub_menu_code: string;
}

@Injectable({
    providedIn: 'root'
})
export class TargetService {
    constructor(private httpClient:HttpClient) {}

    menuCode : RequestCode = new RequestCode()

    getTargetUrlLink(topCode : string, subCode : string) : any {
        this.menuCode.top_menu_code = topCode
        this.menuCode.sub_menu_code = subCode

        return this.httpClient
            .post<HttpResponse<any>> (
                getTargetUrlLink,
                this.menuCode,
                HTTP_OPTIONS
            ).pipe(map(res => {
                console.log(res)
                return res;
            }));
    }
}