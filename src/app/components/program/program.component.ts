import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {AnswerComponent} from "../answer/answer.component";
import {MatDialog} from "@angular/material/dialog";
import {CookiesService} from "../../services/cookies.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

    files: NgxFileDropEntry[] = [];

    chosenFile: File | null = null;

    disabledSections: string[];
    actualSection?: string;

    filesNames: {[key: string]: string};

    email?: string;
    idToken?: string;

    constructor(private dialog: MatDialog, private cookiesService: CookiesService) {
        this.disabledSections = [];
        this.filesNames = {};
        this.email = cookiesService.getCookie("email");
        this.idToken = cookiesService.getCookie("idToken");
    }

    dropFile(files: NgxFileDropEntry[], id: string) {
        console.log(files[0].relativePath);
        if (!this.disabledSections.includes(id)) {
            this.disabledSections.push(id);
            this.filesNames[id] = files[0].relativePath;
        }
    }

    openBrowser(id: string) {
        if (!this.disabledSections.includes(id)) {
            const file = document.getElementById('input_file')!;
            file.click();
            this.actualSection = id;
        }
    }

    chooseFile(event: any) {
        this.chosenFile = event.target.files[0];
        if (this.chosenFile) {
            this.filesNames[this.actualSection!] = this.chosenFile.name;
            this.disabledSections.push(this.actualSection!);
        }
    }

    cancel() {
        window.location.reload();
    }

    approve() {
        this.dialog.open(AnswerComponent);
    }

}
