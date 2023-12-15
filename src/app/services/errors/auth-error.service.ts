import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthErrorService {

    constructor() {}

    loginError(error: HttpErrorResponse) {
        return throwError(() => new Error("Spróbuj ponownie."));
    }

}
