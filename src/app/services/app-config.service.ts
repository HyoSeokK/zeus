import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { map } from 'rxjs/operators';
import { BASE_URL, HTTP_GET_OPTIONS } from '../utils/utils';
import { Observable } from 'rxjs';
import { EnvSetting } from '../utils/utils.env';

const systemInfoEndpoint = BASE_URL + "/systemInfo";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  configurations: EnvSetting = new EnvSetting();

  constructor(private httpClient:HttpClient) { }

  async load(): Promise<Observable<EnvSetting>> {
    
    return this.httpClient
          .get(systemInfoEndpoint, HTTP_GET_OPTIONS)
          .pipe(map(response => {
            this.configurations = response as EnvSetting;
            return this.configurations;
          }));
    }
}
