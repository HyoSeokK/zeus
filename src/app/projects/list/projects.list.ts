import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from  "@angular/common/http";
import { throwError as observableThrowError, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
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

    constructor(private  httpClient:HttpClient) {}

    ngOnInit() {
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