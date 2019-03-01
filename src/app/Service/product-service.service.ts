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
    return this.http.post('http://localhost:8080/api/product', product, {headers: headers});
  }
  getProduct(id) {
    return this.http.get('http://localhost:8080/api/product/company/'+id);
  }

  getOneProduct(id){
    return this.http.get('http://localhost:8080/api/product/'+id);
  }
  UpdateProduct(product,id){
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('http://localhost:8080/api/product/'+id,product,{headers:headers});
  }
  DeleteProduct(id){
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.delete('http://localhost:8080/api/product/'+id,{headers: headers});
  }
  getFeedById(id){
    return this.http.get('http://localhost:8080/api/product/feed/'+id);
  }
}
