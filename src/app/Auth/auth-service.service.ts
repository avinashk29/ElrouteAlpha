import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
<<<<<<< HEAD
// token;
//   constructor(private http: Http) { }
//   signup(user) {
//     return this.http.post('http://localhost:3000/auth/signup', user);
//   }
//   login(user) {
//     return this.http.post('http://localhost:3000/auth/login', user);
//   }
=======
token;
  constructor(private http: Http) { }
  signup(user) {
    return this.http.post('http://www.elroute.co.in/api/auth/signup', user);
  }
  login(user) {
    return this.http.post('http://www.elroute.co.in/api/auth/login', user);
  }
>>>>>>> a835fa41b653cd72a7b542200ece86c0607b2ee4
}
