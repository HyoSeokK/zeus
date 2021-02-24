import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';     
import { ThemeService } from '../services/app-theme.service';
import { THEME_ARRAY, ThemeInterface } from '../services/theme';
import { clone } from '../utils/utils';

import '@cds/core/toggle/register.js';

const HAS_STYLE_MODE: string = 'theme';

@Component({
    selector: 'setting.component',
    templateUrl: 'setting.component.html',
    styleUrls: ["setting.component.css"]
})

export class SettingComponent implements OnInit {

    themeArray: ThemeInterface[] = clone(THEME_ARRAY);
    styleMode: string = this.themeArray[0].showStyle;

    constructor(
        private router:Router,
        public theme:ThemeService
        ) {}

    ngOnInit() {
        // set local in app
        if (localStorage) {
            this.styleMode = localStorage.getItem(HAS_STYLE_MODE);
        }
    }

    themeChanged(theme) {
        this.styleMode = theme.mode;
        this.theme.loadStyle(theme.toggleFileName);
        if (localStorage) {
            localStorage.setItem(HAS_STYLE_MODE, this.styleMode);
        }
    }

    goToDataUserManugeLink(): void {
            this.router.navigateByUrl("/app/setting/user");
    }

    goToSmtpLink(): void {
        this.router.navigateByUrl("/app/setting/smtp");
    }

    goToDataStoreDurationLink(): void {
        this.router.navigateByUrl("/app/setting/dataStorage");
    }

    goToYamlLink(): void {
        this.router.navigateByUrl("/app/setting/yaml");
    }
    goToMenuLink(): void {
        this.router.navigateByUrl("/app/setting/menu");
    }
    goToUrlLink(): void {
        this.router.navigateByUrl("/app/setting/url");
    }
    goToRefreshLink(): void {
        this.router.navigateByUrl("/app/setting/refresh");
    }

}