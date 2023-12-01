import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {catchError, Observable, ReplaySubject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersDataSourceService extends DataSource<string> {
    private _dataStream = new ReplaySubject<string[]>();
    private _url = 'https://susel.pythonanywhere.com';
    constructor(private _httpClient: HttpClient) {
        super();
    }

    private _emailToJson(email: string) {
        let json = `{"email":"${email}"}`
        return JSON.parse(json);
    }

    getUsers(): Observable<string[]> {
        return this._httpClient.get<string[]>(`${this._url}/list-user/`)
            .pipe(
                catchError(this.handleError)
            );
    }

    createUser(email: string) {
        let body = this._emailToJson(email);
        return this._httpClient.post<string>(`${this._url}/create-user/`, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteUser(email: string) {
        let body = this._emailToJson(email);
        return this._httpClient.delete<string>(`${this._url}/delete-user/`, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    resetPassword(email: string) {
        let body = this._emailToJson(email);
        return this._httpClient.post<string>(`${this._url}/reset-password/`, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<string[]> {
        return this._dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    setData(data: string[]) {
        this._dataStream.next(data);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
