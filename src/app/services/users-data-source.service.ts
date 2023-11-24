import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Account} from "../model/account";
import {Observable, ReplaySubject} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccountList} from "../model/account-list";

@Injectable({
  providedIn: 'root'
})
export class UsersDataSourceService extends DataSource<Account> {
    private _dataStream = new ReplaySubject<Account[]>();
    constructor(private _httpClient: HttpClient) {
        super();
    }

    getUsers(page: number): Observable<AccountList> {
        const href = 'https://susel.pythonanywhere.com/list-user';

        return this._httpClient.get<AccountList>(href);
    }

    connect(collectionViewer: CollectionViewer): Observable<Account[]> {
        return this._dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    setData(data: Account[]) {
        this._dataStream.next(data);
    }
}
