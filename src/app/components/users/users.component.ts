import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserComponent} from "../delete-user/delete-user.component";
import {UsersDataSourceService} from "../../services/users-data-source.service";
import {HttpClient} from "@angular/common/http";
import {AnswerComponent} from "../answer/answer.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
    displayedColumns: string[] = ['number', 'email', 'reset', 'remove'];
    dataSource: UsersDataSourceService = new UsersDataSourceService(this._httpClient);
    data: string[] = [];
    isLoadingResults: boolean = true;

    newAccountEmail: string = '';
    currentPage: number = 0;
    dataLength: number = 0;
    displayedUsers: number = 5;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.isLoadingResults = true;
        this.dataSource.getUsers(3).subscribe(data => {
            this.isLoadingResults = false;
            this.data = data.map(email => (email !== null ? email : ''));
            this.dataLength = this.data.length;
            this.dataSource.setData(this.data);
        });
    }

    constructor(public dialog: MatDialog, private _httpClient: HttpClient) {
        this.dataSource.setData(this.data);
    }

    deleteUser(row: number) {
        const dialogRef = this.dialog.open(DeleteUserComponent);

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.data.splice(row, 1);
                this.dataSource.setData(this.data);
            }
        });
    }

    addUser(email: string) {
        const parts: string[] = email.split('@');
        const domain: string = parts[1];
        if(domain === 'pwr.edu.pl') {
            // this.dataSource.createUser(email).subscribe(data => {
            //         this.dataToDisplay.push(email);
            //         this.dataSource.setData(this.dataToDisplay);
            // });
            this.dialog.open(AnswerComponent);
        } else {
            this.dialog.open(AnswerComponent);
        }
        this.dataSource.createUser(email).subscribe(data => {
            this.data.push(data);
            this.dataLength = this.data.length;
            this.dataSource.setData(this.data);
        });
    }

    resetPassword(email: string) {
        this.dataSource.resetPassword(email).subscribe();
    }

    handlePage(event: PageEvent) {
        const startIndex = (this.paginator.pageIndex) * this.displayedUsers;
        const endIndex = startIndex + this.displayedUsers;
        let dataToDisplay: string[] = this.data;
        this.dataSource.setData(dataToDisplay.slice(startIndex, endIndex));
    }

}
