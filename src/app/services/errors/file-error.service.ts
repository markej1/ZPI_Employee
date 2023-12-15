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
        } else if (error.status === 405) {
            return throwError(() => new Error("Nieprawidłowa metoda żądania."));
        } else if (error.status === 409) {
            return throwError(() => new Error("Złe pliki podane."));
        } else {
            return throwError(() => new Error("Błąd serwera."));
        }
    }

}
