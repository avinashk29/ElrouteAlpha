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
product_id;
productName
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public product: ProductServiceService, 
  public feed: FeedService) { }

  ngOnInit() {
   this.id = this.storage.get('companyId');
    this.product.token = this.storage.get('token');
    this.product.getProduct(this.id).subscribe(res => {
      this.products = JSON.parse(res['_body'])
    })
  }
  getProduct(){
  this.feed.tagId = this.products[this.product_id]._id;
  this.feed.productName=this.products[this.product_id].productName;
  this.feed.productImage=this.products[this.product_id].Image;
  this.feed.productDescription=this.products[this.product_id].shortDescription;
}
}
