import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
token;
  constructor(private http: Http) { }
  signup(user) {
    return this.http.post('/auth/signup', user);
  }
  login(user) {
    return this.http.post('/auth/login', user);
  }
}
