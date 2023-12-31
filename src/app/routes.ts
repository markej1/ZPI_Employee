import {Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {ProgramComponent} from "./components/program/program.component";
import {ProgramsComponent} from "./components/programs/programs.component";
import {UsersComponent} from "./components/users/users.component";

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
    },
    {
        path: "programs",
        component: ProgramsComponent
    },
    {
        path: "users",
        component: UsersComponent
    }
]

export default routeConfig;
