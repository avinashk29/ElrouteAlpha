import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
token;
productData;
productId;
value;
key;

private empDetailSubject = new BehaviorSubject(null);
changedata=this.empDetailSubject.asObservable();
  constructor(public http: Http) { }
  addProduct(product) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.post('http://localhost:8080/api/product', product, {headers: headers});
  }
  getProduct(id) {
    return this.http.get('http://localhost:8080/api/product/company/'+id);

  }
  getAllProduct(id) {
    return this.http.get('http://localhost:8080/api/product/all/company/'+id);

  }
groupProduct(data){
  const headers = new Headers();
  headers.append('x-auth', this.token);
  return this.http.post('http://localhost:8080/api/groupProduct/', data,  {headers:headers});
}
deletegroup(data) {
  const headers = new Headers();
  headers.append('x-auth', this.token);
  return this.http.delete('http://localhost:8080/api/groupProduct/' + data,  {headers:headers});
}
updateGroup(data){
  const headers = new Headers();
  headers.append('x-auth', this.token);
  console.log(data);
  return this.http.patch('http://localhost:8080/api/groupProduct/' , data,  {headers:headers});
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
    return this.http.get('http://localhost:8080/api/product/feed/'+id)
  }
  sendData(value) {
    this.empDetailSubject.next(value);
    console.log(this.empDetailSubject)
}
getData()
{
  return this.empDetailSubject.asObservable();
}
}
