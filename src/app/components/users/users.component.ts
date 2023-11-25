import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Account} from "../../model/account";
import {ProgramsDataSourceService} from "../../services/programs-data-source.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProgramComponent} from "../delete-program/delete-program.component";
import {DeleteUserComponent} from "../delete-user/delete-user.component";
import {UsersDataSourceService} from "../../services/users-data-source.service";
import {HttpClient} from "@angular/common/http";
import {catchError, map, merge, startWith, switchMap} from "rxjs";
import {AnswerComponent} from "../answer/answer.component";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
    displayedColumns: string[] = ['number', 'email', 'reset', 'remove'];
    dataToDisplay: Account[] = [];
    dataSource = new UsersDataSourceService(this._httpClient);
    dataLength = this.dataToDisplay.length;
    data: String[] = [];
    isLoadingResults = true;
    isRateLimitReached = false;

    newAccountEmail: string = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        merge()
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.dataSource!.getUsers(
                        1,
                    ).pipe();
                }),
                map(data => {
                    this.isLoadingResults = false;
                    this.isRateLimitReached = data === null;
                    if (data === null) {
                        return [];
                    }
                    // this.resultsLength = data.total_count;
                    return data;
                })
            ).subscribe(data => {
                this.data = data.map(email => (email !== null ? email : ''))
            });
    }

    constructor(public dialog: MatDialog, private _httpClient: HttpClient) {
        this.dataSource.setData(this.dataToDisplay);
    }

    deleteUser(row: number) {
        const dialogRef = this.dialog.open(DeleteUserComponent);

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.dataToDisplay.splice(row, 1);
                this.dataSource.setData(this.dataToDisplay);
            }
        });
    }

    addUser(email: string) {
        const parts: string[] = email.split('@');
        const domain: string = parts[1];
        if(domain === 'pwr.edu.pl') {
            this.dataToDisplay.push(
                {
                    // number: 1,
                    email: email
                });
            this.dataSource.setData(this.dataToDisplay);

            this.dialog.open(AnswerComponent);
        } else {
            this.dialog.open(AnswerComponent);
        }
    }
}
