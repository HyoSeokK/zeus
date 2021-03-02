import { AppConfigService } from './services/app-config.service';
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () => 
      keycloak.init({
        config: {
          url: 'http://192.168.0.118:9090/auth/',
          realm: 'master',
          clientId: 'zeus_portal',

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