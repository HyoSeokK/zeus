import { Component } from '@angular/core';

import '@cds/core/toggle/register.js';
import { ClarityIcons, userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon } from '@cds/core/icon';
ClarityIcons.addIcons(userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon);

@Component({
    selector: 'app-layout',
    templateUrl: 'app-layout.html',
    styleUrls: ["app-layout.css"]
})

export class AppLayoutComponent {
    isUserExisting = true;
}