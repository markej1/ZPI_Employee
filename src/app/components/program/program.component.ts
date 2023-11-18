import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

    actualHTMLIndex: number = 0;
    actualIndex: number = 0;

    files: NgxFileDropEntry[] = [];

    chosenFile: File | null = null;

    availableSections: boolean[] = [];
    actualSection?: number;

    filesNames: string[] = [];

    constructor() {
        this.availableSections = Array(4).fill(true);
        this.filesNames = Array(4).fill("");
    }

    dropFile(files: NgxFileDropEntry[], index: number) {
        console.log(files[0].relativePath);
        if (this.availableSections[index]) {
            this.availableSections[index] = false;
            this.filesNames[index] = files[0].relativePath;
        }
    }

    openBrowser(index: number) {
        if (this.availableSections[index]) {
            const file = document.getElementById('input_file')!;
            file.click();
            this.actualSection = index;
        }
    }

    chooseFile(event: any) {
        this.chosenFile = event.target.files[0];
        if (this.chosenFile) {
            this.filesNames[this.actualSection!] = this.chosenFile.name;
            this.availableSections[this.actualSection!] = false;
        }
    }

    cancel() {
        window.location.reload();
    }

}
