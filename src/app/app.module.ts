import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule, provideProtractorTestingSupport} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MarginComponent } from './components/margin/margin.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {provideRouter, RouterModule} from "@angular/router";
import routeConfig from "./routes";
import { ProgramComponent } from './components/program/program.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxFileDropModule} from "ngx-file-drop";
import { AnswerComponent } from './components/answer/answer.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UsersComponent } from './components/users/users.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ProgramsComponent } from './components/programs/programs.component';
import { DeleteProgramComponent } from './components/delete-program/delete-program.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { ErrorComponent } from './components/error/error.component';
import { NotauthComponent } from './components/notauth/notauth.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MarginComponent,
        ProgramComponent,
        AnswerComponent,
        UsersComponent,
        ProgramsComponent,
        DeleteProgramComponent,
        DeleteUserComponent,
        ErrorComponent,
        NotauthComponent
    ],
    imports: [
        BrowserModule,
        MatSlideToggleModule,
        MatButtonModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NgxFileDropModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatProgressSpinnerModule
    ],
    providers: [
        provideProtractorTestingSupport(),
        provideRouter(routeConfig),
        importProvidersFrom(HttpClientModule)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
