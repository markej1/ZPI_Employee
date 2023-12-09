import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notauth',
  templateUrl: './notauth.component.html',
  styleUrls: ['./notauth.component.css']
})
export class NotauthComponent {

    @Input() message: string = "Wystąpił jakiś niezidentyfikowany błąd...";

}
