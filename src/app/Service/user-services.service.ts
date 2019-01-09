import { Injectable } from "@angular/core";
import {Http,Headers} from '@angular/http';
   
@Injectable({
    providedIn:'root'
})
export class UserService{
    token
    UserData: [];
    constructor(public http:Http){}

    getUserData(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:3000/user',{headers:headers})
    }

}