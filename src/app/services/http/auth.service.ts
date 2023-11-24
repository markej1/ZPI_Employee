import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserData} from "../../model/user-data";
import {Token} from "../../model/token";
import {AuthErrorService} from "../errors/auth-error.service";
import {catchError, Observable, throwError} from "rxjs";

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
                catchError(this.authError!.notAuthorized)
            );
    }

    // checkSignIn(token: Token) {
    //     // check url below
    //     return this.http.post<boolean>("https://susel.pythonanywhere.com/", token);
    // }

}
