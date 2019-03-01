import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
token;
productData;
  constructor(public http: Http) { }
  addProduct(product) {
    const headers = new Headers();
    // const productData = new FormData();
    // productData.append('productName', product.productName);
    // productData.append('shortDescription', product.shortDescription);
    // productData.append('price ', product.price);
    // productData.append('maxPrice', product.maxPrice);
    // productData.append('minPrice', product.minPrice);
    // productData.append('moq', product.moq);
    // productData.append(' industry', product.industry);
    // productData.append('category', product.category);
    // productData.append('Image', product.Image);
    // productData.append('tfCode', product.tfCode);
   // productData.append('productInfo', product.productInfo);
    headers.append('x-auth', this.token);
    console.log(this.token);
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
  //   const productData = new FormData();
  //  productData.append('Image', product.Image);
  //   productData.append('productName', product.productName);
  //   productData.append('shortDescription', product.shortDescription);
  //    productData.append('price ', product.price);
  //    productData.append('maxPrice', product.maxPrice);
  //    productData.append('minPrice', product.minPrice);
  //   productData.append('moq', product.moq);
  //   productData.append(' industry', product.industry);
  //   productData.append('category', product.category);
  //   productData.append('tfCode', product.tfCode);
  //   productData.append(' productSpecification', product.productSpecification);
  //   productData.append('specificationContent', product.specificationContent);
  //    productData.append('productInfo', product.productInfo);
    headers.append('x-auth', this.token);
    console.log(this.token);
   
    return this.http.patch('http://localhost:8080/api/product/'+id,product,{headers:headers});
  }
  DeleteProduct(id){
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.delete('http://localhost:8080/api/product/'+id,{headers: headers});
  }
  getFeedById(id){
    // const headers = new Headers();
    // headers.append('x-auth', this.token);
    // console.log(this.token);
    return this.http.get('http://localhost:8080/api/product/feed/'+id);
  }
}
