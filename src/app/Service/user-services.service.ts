import { Injectable } from '@angular/core';
import {Http , Headers} from '@angular/http';
import {  } from 'angular-webstorage-service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    token;
    constructor(public http: Http) {}

    getUserData() {
        const headers = new Headers();
        headers.append('x-auth', this.token);
        return this.http.get('http://www.elroute.co.in/api/user', {headers: headers});
    }


}
