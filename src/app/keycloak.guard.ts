import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard extends KeycloakAuthGuard {
  
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if(!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    console.log('role restriction given at app-routing.module for this route', route.data.roles);
    console.log('User roles coming after login from keycloak :', this.roles);

    // path 에서 필요한 roles
    const requiredRoles = route.data.roles;

    if(!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    } else {
      for (const requiredRole of requiredRoles) {
        if(this.roles.indexOf(requiredRole) > -1) {
          console.log(requiredRole)
          return true;
        }
      }
      console.log("false")
    }

    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
