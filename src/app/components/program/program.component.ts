import {Component, OnInit} from '@angular/core';
import {NgxFileDropEntry} from "ngx-file-drop";
import {AnswerComponent} from "../answer/answer.component";
import {MatDialog} from "@angular/material/dialog";
import {CookiesService} from "../../services/cookies.service";
import {AuthService} from "../../services/http/auth.service";
import {Token} from "../../model/token";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

    files: NgxFileDropEntry[] = [];

    chosenFile: File | null = null;

    disabledSections: string[];
    actualSection?: string;

    filesNames: {[key: string]: string};

    isLogged?: boolean;
    token?: Token

    constructor(
        private dialog: MatDialog,
        private cookiesService: CookiesService,
        private authService: AuthService,
    ) {
        this.disabledSections = [];
        this.filesNames = {};
    }

    ngOnInit() {
        this.token = {
            email: this.cookiesService.getCookie("email"),
            idToken: this.cookiesService.getCookie("idToken"),
            isAdmin: this.cookiesService.getCookie("isAdmin") === "true"
        };
        // this.isLogged = this.checkAuth.checkAuth(this.token, this.authService);
        this.authService.checkAuth(this.token).subscribe({
            next: loginInfo => {
                this.isLogged = loginInfo.isLog;
            }
        });
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
