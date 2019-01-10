import { Injectable } from '@angular/core';
import {Http , Headers} from '@angular/http';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    token;
    UserData;
    Data;
    constructor(public http: Http) {}

    getUserData() {
        const headers = new Headers();
        headers.append('x-auth', this.token);
        return this.http.get('http://localhost:3000/user', {headers: headers}).subscribe(res => {

          this.UserData = JSON.parse(res['_body']).UserName;
          console.log(JSON.parse(res['_body']).UserName);

});

<<<<<<< HEAD
=======
    getUserData(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:3000/user',{headers:headers});
>>>>>>> cab7eae895e644a895418c086f4fd7a2c7a51f6f
    }


}
