import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserData} from "../../model/user-data";
import {Token} from "../../model/token";
import {AuthErrorService} from "../errors/auth-error.service";
import {catchError, Observable} from "rxjs";
import {LoginInfo} from "../../model/login-info";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authError?: AuthErrorService;

    constructor(private http: HttpClient) {
        this.authError = new AuthErrorService();
    }

    signIn(userData: UserData): Observable<Token> {
        return this.http.post<Token>("https://susel.pythonanywhere.com/sign-in/", userData)
            .pipe(
                catchError(this.authError!.loginError)
            );
    }

    checkAuth(token: Token): Observable<LoginInfo> {
        return this.http.post<LoginInfo>("https://susel.pythonanywhere.com/check/", token);
    }

}
