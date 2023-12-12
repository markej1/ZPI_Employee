import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit{

    answer: boolean = false;
    message: string = ""

    constructor(@Inject(MAT_DIALOG_DATA) public answerData: any) {
    }

    ngOnInit() {
        this.answer = this.answerData.answer;
        this.message = this.answerData.message;
    }

}
