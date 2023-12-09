import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileErrorService {

    constructor() {}

    fileError(error: HttpErrorResponse) {
        if (error.status === 400) {
            return throwError(() => new Error("Niepoprawne pliki."));
        } else {
            return throwError(() => new Error("Błąd serwera."));
        }
    }

}
