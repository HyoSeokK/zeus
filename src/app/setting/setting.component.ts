import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from  "@angular/common/http";
import { ThemeService } from '../services/app-theme.service';
import { THEME_ARRAY, ThemeInterface } from '../services/theme';
import { clone, BASE_URL } from '../utils/utils';
import { EnvSetting } from '../utils/utils.env';
import { User, AdminInfo } from './user/user';
import { FormControl, FormGroup } from '@angular/forms';

import '@cds/core/toggle/register.js';

const THEME_STORAGE_NM: string = 'env';
const changeThemeEndpoint = BASE_URL + "/changeTheme";

@Component({
    selector: 'setting.component',
    templateUrl: 'setting.component.html',
    styleUrls: ["setting.component.css"]
})

export class SettingComponent implements OnInit {

    isModalVisible = false;
    url : string = "groups";
    env : EnvSetting;
    themeRst : string;
    themeArray: ThemeInterface[] = clone(THEME_ARRAY);
    styleMode: string = this.themeArray[0].showStyle;
    regiAuthMode : string;
    adminCli : AdminInfo = new AdminInfo();

    

    constructor(
        private router:Router,
        public theme:ThemeService
        ) {}

    ngOnInit() {
        if (localStorage) {
            this.env = JSON.parse(localStorage.getItem('env')) as EnvSetting;
            console.log("env : " + JSON.stringify(this.env))
            this.styleMode = this.env.themeSettingVal;
            console.log("env : " + JSON.stringify(this.styleMode))

        }
    }

    switchTheme() {
        var env = JSON.parse(localStorage.getItem("env")) as EnvSetting;
        let styleMode = this.themeArray[0].showStyle;
    
        const localHasStyle = localStorage && env.themeSettingVal;
        if (localHasStyle) {
            styleMode = env.themeSettingVal;

            if(localHasStyle == "LIGHT")
                styleMode = "DARK"
            if(localHasStyle == "DARK")
                styleMode = "LIGHT"

            env.themeSettingVal = styleMode;
            localStorage.setItem("env", JSON.stringify(env));

            this.theme.updateTheme().subscribe(res => {
                if(res.status == 200) {
                    console.log("success")
                }
            })
            
        } else {
            env.themeSettingVal = styleMode;
            localStorage.setItem("env", JSON.stringify(env));
        }
       
        this.themeArray.forEach((themeItem) => {
        
            if (themeItem.showStyle === styleMode) {
              console.log("themeItem.showStyle : " + themeItem.showStyle)
              console.log(themeItem.currentFileName) 
              this.theme.loadStyle(themeItem.currentFileName);
            }
        });
    
      }

    adminCliForm = new FormGroup({
        id : new FormControl(''),
        pw : new FormControl(''),
        client : new FormControl(''),
        secret : new FormControl(''),
        url : new FormControl(''),
    })

    goToAdminApiManageLink() : void {
        this.adminCli.adminId = this.adminCliForm.controls.id.value;
        this.adminCli.adminPw = this.adminCliForm.controls.pw.value;
        this.adminCli.clientId = this.adminCliForm.controls.client.value;
        this.adminCli.clientSecret = this.adminCliForm.controls.secret.value;
        this.adminCli.tokenUrl = this.adminCliForm.controls.url.value;
      
        localStorage.setItem("cli", JSON.stringify(this.adminCli))

        if(this.url == "groups") {
            this.router.navigateByUrl("/app/setting/group");
        } else if (this.url == "admin") {
            this.router.navigateByUrl("/app/setting/user/admin");
        }
    }
    
    goToGroupManageLink() : void {
        this.adminCli.adminId = this.adminCliForm.controls.id.value;
        this.adminCli.adminPw = this.adminCliForm.controls.pw.value;
        this.adminCli.clientId = this.adminCliForm.controls.client.value;
        this.adminCli.clientSecret = this.adminCliForm.controls.secret.value;
        this.adminCli.tokenUrl = this.adminCliForm.controls.url.value;
      
        localStorage.setItem("cli", JSON.stringify(this.adminCli))

        
    }

    goToDevUserManageLink() : void {
        this.router.navigateByUrl("/app/setting/user/developer")
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