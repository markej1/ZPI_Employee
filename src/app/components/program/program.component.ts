import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

    files: NgxFileDropEntry[] = [];

    chosenFile: File | null = null;
    chosenFileName?: string;

    availableSections: boolean[] = [];
    actualSection?: number;

    constructor() {
        this.availableSections = Array(4).fill(true);
    }

    dropFile(files: NgxFileDropEntry[]) {
        console.log(files);
    }

    openBrowser(index: number) {
        if (this.availableSections[index]) {
            const file = document.getElementById('input_file_' + index)!;
            file.click();
            this.actualSection = index;
        }
    }

    chooseFile(event: any) {
        this.chosenFile = event.target.files[0];
        if (this.chosenFile) {
            this.chosenFileName = this.chosenFile.name;
            this.availableSections[this.actualSection!] = false;
        }
    }

}
