import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
token;
  constructor(private http: Http) { }
  signup(user) {
    return this.http.post('http://localhost:3000/auth/signup', user);
  }
  login(user) {
    return this.http.post('http://localhost:3000/auth/login', user);
  }
}
