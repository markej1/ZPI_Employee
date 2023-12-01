import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-program',
  templateUrl: './delete-program.component.html',
  styleUrls: ['./delete-program.component.css']
})
export class DeleteProgramComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteProgramComponent>,
    ) {}

    deleteProgram() {
        this.dialogRef.close(true);
    }
}
