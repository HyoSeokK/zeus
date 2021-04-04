import { AppConfigService } from './services/app-config.service';
import { KeycloakService } from 'keycloak-angular';
import { EmailValidator } from '@angular/forms';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () => 
      keycloak.init({
        config: {
          url: 'https://docker.jointree.co.kr:8443/auth/',
          //url: 'http://192.168.0.118:8080/auth/',
          realm: 'parthenon',
          clientId: 'zeus',

        },
        initOptions : {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html',
        },
        loadUserProfileAtStartUp:true
    });
}
  
export function initConfig (configService : AppConfigService) {
    return async () => (await configService.load()).subscribe(response => {
        localStorage.setItem("env", JSON.stringify(response[0]));
      });
}