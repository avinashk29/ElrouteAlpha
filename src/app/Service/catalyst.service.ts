import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class CatalystService {

  constructor(public http: Http) { }
  onHireCatalyst(data) {
    console.log(data);
    return this.http.post('http://localhost:8080/api/catalyst', data);

  }
}
