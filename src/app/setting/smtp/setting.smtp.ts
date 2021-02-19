import { Component } from '@angular/core';

import { ClarityIcons, userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon } from '@cds/core/icon';
ClarityIcons.addIcons(userIcon, checkboxListIcon, calendarIcon, folderOpenIcon, administratorIcon);

@Component({
    selector: 'setting-smtp',
    templateUrl: 'setting.smtp.html'
})

export class SmtpComponent {

    options:any = {
        option1:true,
        option2:false
    }

    items:any = [
        "one",
        "two",
        "three"
    ]

    onSubmit(): void {

    }
}