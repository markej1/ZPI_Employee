import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/http/auth.service";
import {UserData} from "../../model/user-data";
import {Token} from "../../model/token";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    login?: string;
    password?: string;

    passwordHidden: boolean = true;

    userData?: UserData;
    token?: Token;

    constructor(private router: Router, private authService: AuthService) {
    }

    changeVisibility() {
        this.passwordHidden = !this.passwordHidden;
    }

    checkData() {
        if (this.login != null && this.password != null) {
            this.userData = {
                login: this.login,
                password: this.password
            };
            this.authService.signIn(this.userData).subscribe(
                tokenGiven => this.token = {
                    user_id: tokenGiven.user_id,
                    token: tokenGiven.token
                }
            );
        }
        // this.router.navigateByUrl("/program");
    }

}
