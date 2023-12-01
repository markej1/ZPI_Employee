import {Inject, inject, Injectable} from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";
import {Program} from "../model/program";

@Injectable({
  providedIn: 'root'
})
export class ProgramsDataSourceService extends DataSource<Program> {
    private _dataStream = new ReplaySubject<Program[]>();
    constructor() {
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
}
