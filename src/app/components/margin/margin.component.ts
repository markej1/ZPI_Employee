import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookiesService} from "../../services/cookies.service";

@Component({
  selector: 'app-margin',
  templateUrl: './margin.component.html',
  styleUrls: ['./margin.component.css']
})
export class MarginComponent implements OnInit{

    isLogged: boolean = false;

    constructor(private router: Router, private cookiesService: CookiesService) {}

    ngOnInit() {
        if (this.cookiesService.getCookie("email") !== "" && this.cookiesService.getCookie("idToken") !== "") {
            this.isLogged = true;
        }
    }

    logout() {
        this.router.navigateByUrl("/");
    }

}
