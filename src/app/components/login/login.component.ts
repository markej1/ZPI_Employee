import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    login?: string;
    password?: string;

    passwordHidden: boolean = true;

    constructor(private router: Router) {
    }

    changeVisibility() {
        this.passwordHidden = !this.passwordHidden;
    }

    checkData() {
        this.router.navigateByUrl("/program")

    }

}
