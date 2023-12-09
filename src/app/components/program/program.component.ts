import {Component, OnInit} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {AnswerComponent} from "../answer/answer.component";
import {MatDialog} from "@angular/material/dialog";
import {CookiesService} from "../../services/cookies.service";
import {AuthService} from "../../services/http/auth.service";
import {Token} from "../../model/token";
import {FileService} from "../../services/http/file.service";

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

    filesNames: { [key: string]: string };

    isLogged?: boolean;
    token?: Token

    fileList: { [key: string]: File };

    constructor(
        private dialog: MatDialog,
        private cookiesService: CookiesService,
        private authService: AuthService,
        private fileService: FileService
    ) {
        this.disabledSections = [];
        this.filesNames = {};
        this.fileList = {};
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
        if (!this.disabledSections.includes(id) && files[0].fileEntry.isFile && this.isPdf(files[0].relativePath)) {

            const fileEntry = files[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
                this.fileList[id] = file;
                console.log(file);
            });

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
            this.fileList[this.actualSection!] = this.chosenFile;
            console.log(this.chosenFile)
        }
    }

    isPdf(path: String): boolean {
        return path.endsWith(".pdf");
    }

    cancel() {
        window.location.reload();
    }

    approve() {
        const formData = new FormData();
        formData.append("pdf_file_effects", this.fileList["pdf_file_effects"]);
        formData.append("pdf_file_plan", this.fileList["pdf_file_plan"]);
        formData.append("pdf_file_program", this.fileList["pdf_file_program"]);
        formData.append("pdf_file_cards", this.fileList["pdf_file_cards"]);

        this.fileService.sendFiles(formData).subscribe({
            next: text => {
                this.openDialog(true, text);
            },
            error: err => {
                this.openDialog(false, err.message);
            }
        });

    }

    openDialog(answer: boolean, message: string) {
        this.dialog.open(AnswerComponent, {
            data: {
                answer: answer,
                message: message
            }
        });
    }

}
