import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../services/app-theme.service';
import { THEME_ARRAY, ThemeInterface } from '../services/theme';
import { clone } from '../utils/utils';
import { EnvSetting } from '../utils/utils.env';
import { AdminInfo } from './user/user';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './setting.service'
import { KeycloakService } from 'keycloak-angular';

import '@cds/core/toggle/register.js';

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

    authList : AdminInfo[]
    authLen : number
    auth:boolean;
    menuDiv : string;
    role : string;
    themecheck : boolean;

    constructor(
        private router:Router,
        public theme:ThemeService,
        public authService:AuthService,
        protected readonly keycloak: KeycloakService
        ) {}

    ngOnInit() {
        if (localStorage) {
            this.env = JSON.parse(localStorage.getItem('env')) as EnvSetting;
            console.log("env : " + JSON.stringify(this.env))
            this.styleMode = this.env.themeSettingVal;
            this.auth = this.env.userRegisterAuth
        }
        if(this.styleMode == "DARK"){
            this.themecheck = true;
        }else if(this.styleMode == "LIGHT"){
            this.themecheck = false;
        }

        this.authService.authList().subscribe(res => {
            this.authLen = res.len
            this.authList = res.data as AdminInfo[]
        });
        if (this.auth == true && this.authLen > 0) { // 사용자 등록 권한이 ON이고 Auth 정보도 등록되어 있다면
            // adminCli Obj에 Auth 정보들을 세팅한다.
            this.adminCli.adminId = this.authList[0].adminId;
            this.adminCli.adminPw = this.authList[0].adminPw;
            this.adminCli.clientId = this.authList[0].clientId;
            this.adminCli.clientSecret = this.authList[0].clientSecret;
            this.adminCli.tokenUrl = this.authList[0].tokenUrl;
      
            localStorage.setItem("cli", JSON.stringify(this.adminCli))
        }
        this.role = this.keycloak.getUsername();
        console.log("role : " + this.role)
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
              this.theme.loadStyle(themeItem.currentFileName);
            }
        });
    
      }

    // 사용자 등록 권한 on/off 
    updateUserRegisterAuth() : void {
        var env = JSON.parse(localStorage.getItem("env")) as EnvSetting;
        var authMode = env.userRegisterAuth

        console.log("authMode : " + JSON.stringify(env))

        // 현재 상태가 on이라면 off로 변경
        if (authMode == true){
            env.userRegisterAuth = false
            this.auth = false
        }
        // 현재 상태가 off라면 on으로 변경
        if (authMode == false){
            env.userRegisterAuth = true
            this.auth = true
            // DB에 저장되어있는 Auth 정보가 없다면 Setting Popup Enable
            if(this.authLen < 1) {
                this.isModalVisible = true;
                this.url = 'setting'
            } else { // DB에 저장된 Auth 정보가 있다면 adminCli Obj에 Auth 정보 세팅
                this.adminCli.adminId = this.authList[0].adminId;
                this.adminCli.adminPw = this.authList[0].adminPw;
                this.adminCli.clientId = this.authList[0].clientId;
                this.adminCli.clientSecret = this.authList[0].clientSecret;
                this.adminCli.tokenUrl = this.authList[0].tokenUrl;
        
                localStorage.setItem("cli", JSON.stringify(this.adminCli))
            }
        }
        localStorage.setItem("env", JSON.stringify(env))

        // 등록 권한 UPDATE
        this.theme.updateTheme().subscribe(res => {
            if(res.status == 200) {
                console.log("success")
            }
        })

        
    }

    adminCliForm = new FormGroup({
        id : new FormControl(''),
        pw : new FormControl(''),
        client : new FormControl(''),
        secret : new FormControl(''),
        url : new FormControl(''),
    })

    authInfoSettingFunc() : void {
        
        this.goToAdminApiManageLink(this.url);
    }

    // Keycloak API를 사용하기 위한 Auth 정보 등록
    goToAdminApiManageLink(url : string) : void {
        this.url = url;
        // 사용자 등록 권한 ON
        if (this.auth == true) {
            // AuthInfo가 저장되어 있지 않다면..(Setting Page Toggle 버튼에서 사용됨.)
            if(this.authLen < 1) {
                this.adminCli.adminId = this.adminCliForm.controls.id.value;
                this.adminCli.adminPw = this.adminCliForm.controls.pw.value;
                this.adminCli.clientId = this.adminCliForm.controls.client.value;
                this.adminCli.clientSecret = this.adminCliForm.controls.secret.value;
                this.adminCli.tokenUrl = this.adminCliForm.controls.url.value;

                this.authService.saveAuth(this.adminCli).subscribe(res=>{
                    if(res.status == 200 && res.data.data) {
                        this.authLen = res.data.len;
                        //this.authList[0].push(this.adminCli);
                    }
                });
                this.authLen = 1;

                console.log("this.auth == true and this.authLen < 1 " + JSON.stringify(this.adminCli))
            } else {
                // AuthInfo가 저장되어 있음. (권한 관리, 관리자 관리, 개발자 관리 등에서 사용됨.)
                this.adminCli.adminId = this.authList[0].adminId;
                this.adminCli.adminPw = this.authList[0].adminPw;
                this.adminCli.clientId = this.authList[0].clientId;
                this.adminCli.clientSecret = this.authList[0].clientSecret;
                this.adminCli.tokenUrl = this.authList[0].tokenUrl;
                console.log("this.auth == true and this.authLen > 1 " + JSON.stringify(this.adminCli))
            }
        }
        // 사용자 등록 권한 OFF - AuthInfo를 필요로 하는 메뉴 접근 시 팝업창에서 데이터 받아옴.
        if(this.auth == false){
            this.adminCli.adminId = this.adminCliForm.controls.id.value;
            this.adminCli.adminPw = this.adminCliForm.controls.pw.value;
            this.adminCli.clientId = this.adminCliForm.controls.client.value;
            this.adminCli.clientSecret = this.adminCliForm.controls.secret.value;
            this.adminCli.tokenUrl = this.adminCliForm.controls.url.value;
            console.log("this.auth == false" + JSON.stringify(this.adminCli))
        }
        // Session에 다시 등록
        localStorage.setItem("cli", JSON.stringify(this.adminCli))

        if(this.url == "groups") {
            this.router.navigateByUrl("/app/setting/group");
        } else if (this.url == "admin") {
            this.router.navigateByUrl("/app/setting/user/admin");
        } else if(this.url == 'dev'){
            this.router.navigateByUrl("/app/setting/user/developer");
        } else {
            this.isModalVisible = false;
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