import {Injectable} from '@angular/core';
import {Token} from "../model/token";
import {AuthService} from "./http/auth.service";

@Injectable({
    providedIn: 'root'
})
export class CheckAuth {
    checkAuth(token: Token, authService: AuthService): boolean {
        let isLogged: boolean = false;
        authService.checkAuth(token).subscribe({
            next: loginInfo => {
                isLogged = loginInfo.isLog;
            }
        });
        return isLogged;
    }
}
