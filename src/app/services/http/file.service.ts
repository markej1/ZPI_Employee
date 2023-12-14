import {Injectable} from "@angular/core";
import {FileErrorService} from "../errors/file-error.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    fileErrorService?: FileErrorService;

    constructor(private http: HttpClient) {
        this.fileErrorService = new FileErrorService();
    }

    sendFiles(files: FormData): Observable<string> {
        // const httpOptions = {
        //     headers: new HttpHeaders({'Content-Disposition': 'multipart/form-data'})
        // };

        return this.http.post<string>("https://susel.pythonanywhere.com/upload/", files)
            .pipe(
                catchError(this.fileErrorService!.fileError)
            );
    }

}
