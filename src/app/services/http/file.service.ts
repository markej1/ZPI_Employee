import {Injectable} from "@angular/core";
import {FileErrorService} from "../errors/file-error.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    fileErrorService?: FileErrorService;

    constructor(private http: HttpClient) {
        this.fileErrorService = new FileErrorService();
    }

    sendFiles(files: FormData) {
        return this.http.post("https://susel.pythonanywhere.com/upload/", files)
            .pipe(
                catchError(this.fileErrorService!.fileError)
            );
    }

}
