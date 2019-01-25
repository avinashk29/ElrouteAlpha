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
        return this.http.get('http://localhost:8080/api/user', {headers: headers});
    }
editUser(User){
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    const UserFormData = new FormData();
    UserFormData.append('Image' , User.Image);
    UserFormData.append('UserName' , User.UserName);
    UserFormData.append('Image' , User.Title);
    UserFormData.append('Image' , User.Image);
    UserFormData.append('Image' , User.Image);
    UserFormData.append('Image' , User.Image);
    return this.http.patch('http://localhost:8080/api/user/update', User, {headers: headers});
}

}
