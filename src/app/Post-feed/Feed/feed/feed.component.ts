import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {ProductServiceService} from '../../../Service/product-service.service';
import {FeedService} from '../../../Service/feed-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
id;
products = [];
product_id;
product_name;
productName;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public product: ProductServiceService,
  public feed: FeedService,  public dialog: MatDialog,   public dialogRef: MatDialogRef<FeedComponent>) { }

  ngOnInit() {
   this.id = this.storage.get('companyId');
    this.product.token = this.storage.get('token');
    this.product.getAllProduct(this.id).subscribe(res => {
      // console.log(JSON.parse(res['_body']));
      this.products = JSON.parse(res['_body']);
      // console.log(this.products);
    });
  }
  getProduct(){
    this.products.forEach(product => {
      if(product.productName===this.product_name){
        this.feed.tagId=product._id; 
        this.feed.productName=product.productName;
        this.feed.productImage=product.Image;
        this.feed.productDescription = product.shortDescription;
      }

    });
  
  this.dialogRef.close(FeedComponent);
}



}
