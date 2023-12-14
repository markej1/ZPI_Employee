import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/http/auth.service";
import {UserData} from "../../model/user-data";
import {Token} from "../../model/token";
import {CookiesService} from "../../services/cookies.service";

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
    errorMessage?: string;

    constructor(private router: Router, private authService: AuthService, private cookiesService: CookiesService) {
    }

    changeVisibility() {
        this.passwordHidden = !this.passwordHidden;
    }

    checkData() {
        if (this.login != null && this.password != null) {
            this.userData = {
                email: this.login,
                password: this.password
            };
            this.authService.signIn(this.userData).subscribe({
                next: tokenGiven => {
                    this.token = {
                        email: tokenGiven.email,
                        idToken: tokenGiven.idToken
                    };
                    this.cookiesService.setCookie("email", this.token.email);
                    this.cookiesService.setCookie("idToken", this.token.idToken);
                    this.router.navigateByUrl("/program");
                },
                error: err => {
                    this.errorMessage = err.message;
                }
            });
        }
        // this.router.navigateByUrl("/users")
    }

}
