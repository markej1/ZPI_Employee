import {Inject, inject, Injectable} from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {catchError, Observable, ReplaySubject} from "rxjs";
import {Program} from "../model/program";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProgramsDataSourceService extends DataSource<Program> {
    private _dataStream = new ReplaySubject<Program[]>();
    private _url = 'https://susel.pythonanywhere.com';
    constructor(private _httpClient: HttpClient) {
        super();
    }
    connect(collectionViewer: CollectionViewer): Observable<Program[]> {
        return this._dataStream;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    setData(data: Program[]) {
        this._dataStream.next(data);
    }

    getAllPrograms(): Observable<Program[]> {
        return this._httpClient.get<Program[]>(`${this._url}/list-programs/`)
    }

    deleteProgram(level: number, name: string, cycle: number, specialization: string) {
        if(specialization === undefined) {
            return this._httpClient.get<string>(`${this._url}/delete-program/${level}/${name}/${cycle}/`)
        } else {
            return this._httpClient.get<string>(`${this._url}/delete-program/${level}/${name}/${cycle}/${specialization}/`)
        }
    }
}
