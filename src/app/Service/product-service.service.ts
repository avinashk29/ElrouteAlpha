import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
token;
  constructor(public http: Http) { }
  addProduct(product) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.post('http://localhost:3000/product', {headers: headers});
  }
}
