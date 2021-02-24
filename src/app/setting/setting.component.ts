import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';     

@Component({
    selector: 'setting.component',
    templateUrl: 'setting.component.html',
    styleUrls: ["setting.component.css"]
})

export class SettingComponent {

    constructor(
        private router:Router) {}

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