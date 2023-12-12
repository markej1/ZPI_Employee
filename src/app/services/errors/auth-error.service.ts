import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthErrorService {

    constructor() {}

    loginError(error: HttpErrorResponse) {
        if (error.status === 404) {
            return throwError(() => new Error("Niepoprawne dane."));
        } else {
            return throwError(() => new Error("Błąd serwera."));
        }
    }

}
