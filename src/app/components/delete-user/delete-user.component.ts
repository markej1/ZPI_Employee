import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteUserComponent>,
    ) {}

    deleteProgram() {
        this.dialogRef.close(true);
    }
}
