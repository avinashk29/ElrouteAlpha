import { Injectable } from '@angular/core';
import {Http , Headers} from '@angular/http';
import {BehaviorSubject} from 'rxjs'
import { user} from '../model/userModel'
@Injectable({
    providedIn: 'root'
})
export class UserService {
    userImage;
    userName;
    shortBio;
    location;
    title;
    email;
    following;
    bookmark;
    Image;
    token;
    user;
    private empDetailSubject = new BehaviorSubject(null); 
    constructor(public http: Http) {}

    getUserData() {
        const headers = new Headers();
        headers.append('x-auth', this.token);
        console.log(this.token)
        return this.http.get('http://localhost:8080/api/user', {headers: headers});
    }
editUser(User){
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    const UserFormData = new FormData();
    return this.http.patch('http://localhost:8080/api/user', User, {headers: headers});
}
sendEmployeeDetail(value) {  
    this.user=value;
    this.empDetailSubject.next(this.user);
}  

getdata(){
    return this.empDetailSubject.asObservable()
}

}
