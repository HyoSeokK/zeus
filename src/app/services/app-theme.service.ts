import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    @Inject(DOCUMENT) private document: Document

  ) { }

loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    console.log("head : " + head);

    let themeLink = this.document.getElementById(
        'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
        themeLink.href = styleName;
    } else {
        const style = this.document.createElement('link');
        style.id = 'client-theme';
        style.rel = 'stylesheet';
        style.href = `${styleName}`;

        console.log("style : " + style);
        
        head.appendChild(style);
    }
}
}
