import { Component } from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

    files: NgxFileDropEntry[] = [];

    dropFile(files: NgxFileDropEntry[]) {
        console.log(files);
    }

}
