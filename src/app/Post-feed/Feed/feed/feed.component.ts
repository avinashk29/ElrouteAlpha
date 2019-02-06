import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {ProductServiceService} from '../../../Service/product-service.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
id;
products;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public product: ProductServiceService) { }

  ngOnInit() {
   this.id = this.storage.get('companyId');
    this.product.token = this.storage.get('token');
    console.log(this.storage.get('companyId'))
    this.product.getProduct(this.id).subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.products = JSON.parse(res['_body'])
    })
  }
  getProduct(id){
  console.log(id);
}
}
