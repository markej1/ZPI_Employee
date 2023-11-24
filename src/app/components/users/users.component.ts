import {Component, ViewChild} from '@angular/core';
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

const ELEMENT_DATA: Account[] = [
    {number: 1, email: 'abac@pwr.edu.pl'},
    {number: 2, email: 'dddd@pwr.edu.pl'},
    {number: 3, email: 'gfjddf@pwr.edu.pl'},
    {number: 4, email: 'asdghk@pwr.edu.pl'},
    {number: 2, email: 'abaasdc@pwr.edu.pl'},
    {number: 3, email: 'sdasd@pwr.edu.pl'},
    {number: 4, email: 'ab3r3tac@pwr.edu.pl'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
    displayedColumns: string[] = ['number', 'email', 'reset', 'remove'];
    dataToDisplay = [...ELEMENT_DATA];
    dataSource = new UsersDataSourceService(this._httpClient);
    dataLength = ELEMENT_DATA.length;
    data: Account[] = [];

    newAccountEmail: string = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.getUsers(1).subscribe(data =>
            data.items = this.data,

        );
        console.log(this.data);
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
                    number: 1,
                    email: email
                });
            this.dataSource.setData(this.dataToDisplay);
        } else {
            this.dialog.open(AnswerComponent);
        }
    }
}
