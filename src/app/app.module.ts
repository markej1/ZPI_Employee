import {NgModule} from '@angular/core';
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

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MarginComponent,
        ProgramComponent
    ],
    imports: [
        BrowserModule,
        MatSlideToggleModule,
        MatButtonModule,
        FormsModule,
        RouterModule
    ],
    providers: [
        provideProtractorTestingSupport(),
        provideRouter(routeConfig)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
