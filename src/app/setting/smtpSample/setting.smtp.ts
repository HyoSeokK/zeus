import { Component } from '@angular/core';

//
//

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