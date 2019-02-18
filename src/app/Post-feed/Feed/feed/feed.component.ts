import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {ProductServiceService} from '../../../Service/product-service.service';
import {FeedService} from '../../../Service/feed-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
id;
products;
// productForm = new FormGroup({
//   Productname: new FormControl('')
//   });
product_id;
productName
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public product: ProductServiceService, 
  public feed: FeedService) { }

  ngOnInit() {
   this.id = this.storage.get('companyId');
    this.product.token = this.storage.get('token');
    console.log(this.storage.get('companyId'))
    this.product.getProduct(this.id).subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.products = JSON.parse(res['_body'])
    })
  }
  getProduct(){
  // console.log(this.productForm.value);
  this.feed.tagId = this.products[this.product_id]._id;
  this.feed.productName=this.products[this.product_id].productName;
  this.feed.productImage=this.products[this.product_id].Image;
  this.feed.productDescription=this.products[this.product_id].shortDescription;
}
}
