import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteProgramComponent} from "../delete-program/delete-program.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Program} from "../../model/program";
import {ProgramsDataSourceService} from "../../services/programs-data-source.service";
import {HttpClient} from "@angular/common/http";
import {Observer} from "rxjs";
import {AnswerComponent} from "../answer/answer.component";


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
    displayedColumns: string[] = ['number', 'year', 'fieldOfStudy', 'degree', 'specialization', 'remove'];
    dataSource = new ProgramsDataSourceService(this._httpClient);
    data: Program[] = [];
    isLoadingResults: boolean = false

    currentPage: number = 0;
    dataLength: number = 0;
    displayedPrograms: number = 5;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit() {
        this.isLoadingResults = true;
        this.dataSource.getAllPrograms().subscribe(data => {
            this.isLoadingResults = false;
            this.data = data;
            this.dataLength = this.data.length;
            this.dataSource.setData(data.slice(this.currentPage, this.displayedPrograms));
        });
    }

    constructor(public dialog: MatDialog, private _httpClient: HttpClient) {
        this.dataSource.setData(this.data);
    }

    handlePage(event: PageEvent) {
        this.displayedPrograms = this.paginator.pageSize;

        const startIndex: number = (this.paginator.pageIndex) * this.displayedPrograms;
        const endIndex: number = startIndex + this.displayedPrograms;
        let dataToDisplay: Program[] = this.data;
        this.dataSource.setData(dataToDisplay.slice(startIndex, endIndex));

        this.currentPage = this.paginator.pageIndex;
    }

    deleteProgram(index: number) {
        const dialogRef = this.dialog.open(DeleteProgramComponent);

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                const observer: Observer<any> = {
                    next: (data) => {
                        this.isLoadingResults = false;
                        this.data.splice(index, 1);
                        this.dataLength = this.data.length;
                        this.dataSource.setData(this.data);
                        this.dialog.open(AnswerComponent, {
                            data: {
                                message: data.message,
                                answer: true
                            }
                        });
                    },
                    error: (error) => {
                        this.isLoadingResults = false;
                        this.dialog.open(AnswerComponent, {
                            data: {
                                message: error.message,
                                answer: false
                            }
                        });
                    },
                    complete: () => {}
                };

                this.isLoadingResults = true;
                this.dataSource.deleteProgram(
                    this.data[index].level,
                    this.data[index].name.split(" ").join("_"),
                    this.data[index].startingYear,
                    this.data[index].specialization.split(" ").join("_")
                ).subscribe(observer)

            }
        });
    }

}
