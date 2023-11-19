import { Component } from '@angular/core';
export interface PeriodicElement {
    number: number;
    year: string;
    fieldOfStudy: string;
    degree: string;
    remove: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {number: 1, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'},
    {number: 2, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'},
    {number: 3, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'},
    {number: 4, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'},
    {number: 5, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'},
    {number: 6, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'},
    {number: 7, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'},
    {number: 8, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien", remove: 'H'}
];
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent {
    displayedColumns: string[] = ['number', 'year', 'fieldOfStudy', 'degree', 'remove'];
    dataSource = ELEMENT_DATA;
    dataLength = this.dataSource.length
}
