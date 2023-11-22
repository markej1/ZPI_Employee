import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CookiesService {

    private cookieStore: {[key: string]: string} = {};

    constructor() {
    }

    parseCookies(cookies: string = document.cookie) {
        this.cookieStore = {};
        if (!cookies) {return;}
        const cookiesArray = cookies.split(';');
        for (const cookie of cookiesArray) {
            const cookieArray = cookie.split('=');
            this.cookieStore[cookieArray[0].trim()] = cookieArray[1];
        }
    }

    getCookie(key: string) {
        this.parseCookies();
        if (this.cookieStore[key] == null) { return null; }
        else { return this.cookieStore[key]; }
    }

    removeCookie(key: string) {
        document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    }

    setCookie(key: string, value: string) {
        document.cookie = key + '=' + (value || '');
    }

}
