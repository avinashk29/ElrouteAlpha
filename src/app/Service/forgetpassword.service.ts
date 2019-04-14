import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {
  constructor(private http:Http){}
  forgetPassword(email){
  return this.http.post('http://localhost:8080/api/auth/forgetpassword',email);
  }

  resetPassword(email,password){
      return this.http.patch('http://localhost:8080/api/auth/resetpassword/'+email,password);
  }
}
