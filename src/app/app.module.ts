import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MarginComponent } from './components/margin/margin.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MarginComponent
    ],
    imports: [
        BrowserModule,
        MatSlideToggleModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
