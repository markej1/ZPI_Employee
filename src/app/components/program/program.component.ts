import {Component, OnDestroy} from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {AnswerComponent} from "../answer/answer.component";
import {MatDialog} from "@angular/material/dialog";
import {CookiesService} from "../../services/cookies.service";
import {AuthService} from "../../services/http/auth.service";
import {Token} from "../../model/token";
import {CheckAuth} from "../../services/check-auth.service";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {

    files: NgxFileDropEntry[] = [];

    chosenFile: File | null = null;

    disabledSections: string[];
    actualSection?: string;

    filesNames: {[key: string]: string};

    isLogged: boolean = false;
    errorMessage: string = "";
    token?: Token

    constructor(
        private dialog: MatDialog,
        private cookiesService: CookiesService,
        private authService: AuthService,
        private checkAuth: CheckAuth
    ) {
        this.disabledSections = [];
        this.filesNames = {};
        this.token = {
            email: this.cookiesService.getCookie("email"),
            idToken: this.cookiesService.getCookie("idToken")
        };
        this.isLogged = this.checkAuth.checkAuth(this.token, this.authService);
    }

    // ngOnDestroy() {
    //     this.cookiesService.removeCookie("email");
    //     this.cookiesService.removeCookie("idToken");
    // }

    dropFile(files: NgxFileDropEntry[], id: string) {
        console.log(files[0].relativePath);
        if (!this.disabledSections.includes(id)) {
            this.disabledSections.push(id);
            this.filesNames[id] = files[0].relativePath;
        }
    }

    openBrowser(id: string) {
        if (!this.disabledSections.includes(id)) {
            const file = document.getElementById('input_file')!;
            file.click();
            this.actualSection = id;
        }
    }

    chooseFile(event: any) {
        this.chosenFile = event.target.files[0];
        if (this.chosenFile) {
            this.filesNames[this.actualSection!] = this.chosenFile.name;
            this.disabledSections.push(this.actualSection!);
        }
    }

    cancel() {
        window.location.reload();
    }

    approve() {
        this.dialog.open(AnswerComponent);
    }

}
