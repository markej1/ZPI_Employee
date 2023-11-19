import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
export interface PeriodicElement {
    number: number;
    email: string;
    reset: number;
    remove: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {number: 1, email: 'Hydrogen', reset: 1.0079, remove: 'H'},
    {number: 2, email: 'Helium', reset: 4.0026, remove: 'He'},
    {number: 3, email: 'Lithium', reset: 6.941, remove: 'Li'},
    {number: 4, email: 'Beryllium', reset: 9.0122, remove: 'Be'},
    {number: 2, email: 'Helium', reset: 4.0026, remove: 'He'},
    {number: 3, email: 'Lithium', reset: 6.941, remove: 'Li'},
    {number: 4, email: 'Beryllium', reset: 9.0122, remove: 'Be'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
    displayedColumns: string[] = ['number', 'email', 'reset', 'remove'];
    dataSource = ELEMENT_DATA;
    defaultInputText = "Wprowadz email"

}
