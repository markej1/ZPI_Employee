import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserComponent} from "../delete-user/delete-user.component";
import {UsersDataSourceService} from "../../services/users-data-source.service";
import {HttpClient} from "@angular/common/http";
import {AnswerComponent} from "../answer/answer.component";
import {ErrorComponent} from "../error/error.component";

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
        this.dataSource.getUsers().subscribe(data => {
            this.isLoadingResults = false;
            this.data = data.map(email => (email !== null ? email : ''));
            this.dataLength = this.data.length;
            this.dataSource.setData(data.slice(this.currentPage, this.displayedUsers));
        });
    }

    constructor(public dialog: MatDialog, private _httpClient: HttpClient) {
        this.dataSource.setData(this.data);
    }

    deleteUser(index: number) {
        const dialogRef = this.dialog.open(DeleteUserComponent);

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.isLoadingResults = true;
                this.dataSource.deleteUser(this.data[index]).subscribe( data => {
                    this.isLoadingResults = false;
                    this.data.splice(index, 1);
                    this.dataLength = this.data.length;
                    this.dataSource.setData(this.data);
                    this.dialog.open(AnswerComponent);
                }, error => {
                    this.isLoadingResults = false;
                    this.dialog.open(ErrorComponent);
                });
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
            this.data.push(email);
            this.dataLength = this.data.length;
            let dataToDisplay = this.data.slice(this.currentPage, this.displayedUsers);
            this.dataSource.setData(dataToDisplay);
        });
    }

    resetPassword(index: number) {
        this.isLoadingResults = true;
        this.dataSource.resetPassword(this.data[index]).subscribe( data => {
            this.isLoadingResults = false;
            this.dialog.open(AnswerComponent);
        });
    }

    handlePage(event: PageEvent) {
        this.displayedUsers = this.paginator.pageSize;

        const startIndex: number = (this.paginator.pageIndex) * this.displayedUsers;
        const endIndex: number = startIndex + this.displayedUsers;
        let dataToDisplay: string[] = this.data;
        this.dataSource.setData(dataToDisplay.slice(startIndex, endIndex));

        this.currentPage = this.paginator.pageIndex;
    }
}
