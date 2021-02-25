import { AppConfigService } from './services/app-config.service';
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () => 
      keycloak.init({
        config: {
          url: 'http://192.168.0.118:8080/auth/',
          realm: 'grafana',
          clientId: 'zeus_yc',
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
        localStorage.setItem("theme", response[0].ThemeSettingVal);
    });
}