import {Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {ProgramComponent} from "./components/program/program.component";

const routeConfig: Routes = [
    {
        path: "",
        component: LoginComponent,
        title: "Pracownik PWr"
    },
    {
        path: "program",
        component: ProgramComponent,
        title: "Pracownik PWr"
    }
]

export default routeConfig;
