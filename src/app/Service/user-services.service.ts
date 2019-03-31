import { Injectable, Inject } from '@angular/core';
import {Http , Headers} from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs'
import { user} from '../model/userModel'
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
@Injectable({
    providedIn: 'root'
})
export class UserService {

   
userData;
   
    following=[];
    bookmark=[];
     Image;
   
    constructor(public http: Http,
        
    @Inject(LOCAL_STORAGE) public storage: WebStorageService
        
    ) {}

     getUserData(){
        const headers = new Headers();
      // console.log(this.storage.get('token'))
        headers.append('x-auth', this.storage.get('token'));
        return this.http.get('http://localhost:8080/api/user', {headers: headers});
    }
editUser(User){
    const headers = new Headers();
    headers.append('x-auth', this.storage.get('token'));
    const UserFormData = new FormData();
    return this.http.patch('http://localhost:8080/api/user', User, {headers: headers});
}

getOneUser(id) {
  return this.http.get('http://localhost:8080/api/user/' + id );
}

}
