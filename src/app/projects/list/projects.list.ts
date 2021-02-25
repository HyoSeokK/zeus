import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from  "@angular/common/http";
import { throwError as observableThrowError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { buildHttpRequestOptionsWithObserveResponse} from '../../utils/utils'

class Project {
    Manufacturer : string;
    DeviceCode : string;
    ProductSerialNumber : string;
    TunnelNumber : string;
    TunnelName : string;
    ModelStatus : string;
}

@Component({
    selector: 'projects-list',
    templateUrl: 'projects.list.html',
    styleUrls: ["projects.list.css"]
})

export class ProjectListComponent implements OnInit {
   projectObservable : Observable<HttpResponse<Project[]>>;
   projectList : Project[];

   roles: string[];
   username: string;

    constructor(
        private  httpClient:HttpClient, 
        private keycloakService : KeycloakService) {}

    ngOnInit() {
        let params = new HttpParams();
        this.httpClient
        .get<HttpResponse<Project[]>>(
            "/get/project"
            , buildHttpRequestOptionsWithObserveResponse(params)
            )
        .pipe(
            catchError(error => observableThrowError(error)),
            )
        .subscribe(response => {
            this.projectList = response.body as Project[]
            console.log(this.projectList)
        }, error => {
            console.log(error)
        })
    }
}