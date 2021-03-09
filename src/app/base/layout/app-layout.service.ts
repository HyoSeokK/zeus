import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class IconService {
    constructor(){}
    
    icons : any = {
        "appLogo": '<svg height="30" width="30"><circle cx="10" cy="10" r="10" stroke="black" stroke-width="3" fill="red" />Sorry, your browser does not support inline SVG.  </svg> ',
        "appLogoWithText": '<svg viewBox="0 0 100 100"><use xlink:href="/src/icons/logo.1.svg#appLogo"></use></svg>'
    };

    public load(){        
          window['ClarityIcons'].add(this.icons);
    }

}