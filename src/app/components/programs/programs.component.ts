import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteProgramComponent} from "../delete-program/delete-program.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Program} from "../../model/program";
import {ProgramsDataSourceService} from "../../services/programs-data-source.service";


const ELEMENT_DATA: Program[] = [
    {number: 1, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"},
    {number: 2, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"},
    {number: 3, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"},
    {number: 4, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"},
    {number: 5, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"},
    {number: 6, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"},
    {number: 7, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"},
    {number: 8, year: '2020/2021', fieldOfStudy: "Informatyka stosowana", degree: "I stopien"}
];
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements AfterViewInit {
    displayedColumns: string[] = ['number', 'year', 'fieldOfStudy', 'degree', 'remove'];
    dataToDisplay = [...ELEMENT_DATA];
    dataSource = new ProgramsDataSourceService();
    // pagDataSource = new MatTableDataSource<Program>(this.dataSource);
    dataLength = ELEMENT_DATA.length;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        // this.pagDataSource.paginator = this.paginator;
    }

    constructor(public dialog: MatDialog) {
        this.dataSource.setData(this.dataToDisplay);
    }

    pageChangeEvent(event: PageEvent) {
        // this.dataSource.setData()
    }

    deleteProgram(row: number) {
        const dialogRef = this.dialog.open(DeleteProgramComponent);

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.dataToDisplay.splice(row, 1);
                this.dataSource.setData(this.dataToDisplay);
            }
        });
    }

}
