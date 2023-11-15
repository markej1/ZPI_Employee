import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    password?: string;

    passwordHidden: boolean = true;

    changeVisibility() {
        this.passwordHidden = !this.passwordHidden;
    }

}
