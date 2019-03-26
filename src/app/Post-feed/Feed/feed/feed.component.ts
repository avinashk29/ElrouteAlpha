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
productName;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public product: ProductServiceService,
  public feed: FeedService,  public dialog: MatDialog,   public dialogRef: MatDialogRef<FeedComponent>) { }

  ngOnInit() {
   this.id = this.storage.get('companyId');
    this.product.token = this.storage.get('token');
    this.product.getAllProduct(this.id).subscribe(res => {
      //console.log(JSON.parse(res['_body']));
      this.products = JSON.parse(res['_body']);
      // console.log(this.products);
    });
  }
  getProduct(){
  this.feed.tagId = this.products[this.product_id]._id;
  this.feed.productName=this.products[this.product_id].productName;
  this.feed.productImage=this.products[this.product_id].Image;
  this.feed.productDescription=this.products[this.product_id].shortDescription;
  this.dialogRef.close(FeedComponent);
}
closeLogin() {
  this.dialogRef.close();
}
}
