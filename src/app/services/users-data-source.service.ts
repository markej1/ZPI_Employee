import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersDataSourceService extends DataSource<string> {
    private _dataStream = new ReplaySubject<string[]>();
    private _url = 'https://susel.pythonanywhere.com/';
    constructor(private _httpClient: HttpClient) {
        super();
    }

    getUsers(page: number): Observable<string[]> {
        return this._httpClient.get<string[]>(`${this._url}/list-user/`);
    }

    createUser(email: string) {
        return this._httpClient.post<string>(`${this._url}/create-user/`, email);
    }

    deleteUser(email: string) {
        return this._httpClient.delete<string>(`${this._url}/delete-user/${email}`);
    }

    resetPassword(email: string) {
        return this._httpClient.get<string>(`${this._url}/reset-password/${email}`)
    }

    connect(collectionViewer: CollectionViewer): Observable<string[]> {
        return this._dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    setData(data: string[]) {
        this._dataStream.next(data);
    }
}
