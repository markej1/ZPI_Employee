import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.css']
})
export class MarginComponent {

    constructor(private router: Router) {
    }

    logout() {
        this.router.navigateByUrl("/");
    }

}
