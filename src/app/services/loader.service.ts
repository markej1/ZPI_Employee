import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loading1: boolean = false;

    getLoading1(): boolean {
        return this.loading1;
    }

    setLoading1(value: boolean) {
        this.loading1 = value;
    }

}
