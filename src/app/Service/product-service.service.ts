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
    const productData = new FormData();
    productData.append('productName', product.productName);
    productData.append('shortDescription', product.shortDescription);
    productData.append('price ', product.price);
    productData.append('maxPrice', product.maxPrice);
    productData.append('minPrice', product.minPrice);
    productData.append('moq', product.moq);
    productData.append(' industry', product.industry);
    productData.append('category', product.category);
     productData.append('Image', product.Image);
    productData.append('tfCode', product.tfCode);
    //  productData.append('productInfo', product.productInfo);
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.post('/product', productData, {headers: headers});
  }
  getProduct(id) {
    return this.http.get('/product/company/'+id);
  }

  getOneProduct(id){
    return this.http.get('/product/'+id);
  }
  UpdateProduct(product){
    const headers = new Headers();
    const productData = new FormData();
    productData.append('Image', product.Image);
    productData.append('productName', product.productName);
    productData.append('shortDescription', product.shortDescription);
     productData.append('price ', product.price);
     productData.append('maxPrice', product.maxPrice);
     productData.append('minPrice', product.minPrice);
    productData.append('moq', product.moq);
    productData.append(' industry', product.industry);
    productData.append('category', product.category);
    productData.append('tfCode', product.tfCode);
    productData.append(' productSpecification', product.productSpecification);
    productData.append('specificationContent', product.specificationContent);
     productData.append('productInfo', product.productInfo);
    headers.append('x-auth', this.token);
    console.log(this.token);
    console.log(product);
    return this.http.patch('/product/update',productData,{headers:headers});
  }
  DeleteProduct(id){
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.delete('/product/delete',{headers: headers});
  }
}
