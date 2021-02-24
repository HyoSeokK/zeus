import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from  "@angular/common/http";
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
        console.log(this.keycloakService.getUserRoles());
        console.log(this.keycloakService.getUsername());

        /*
        this.roles = this.keycloakService.getUserRoles();
        this.username = this.keycloakService.();
*/
        this.httpClient
        .get<HttpResponse<Project[]>>(
            "/get/project"
            , buildHttpRequestOptionsWithObserveResponse()
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