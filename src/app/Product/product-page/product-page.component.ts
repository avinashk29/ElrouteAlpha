import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { FeedService } from 'src/app/Service/feed-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  productName;
  shortDescription;
  MinPrice;
  MaxPrice;
  Moq;
  Category;
  Tfcode;
  Time;
  MatchScore;
  ProductInfo;
  feed=[]
  Image;
  category
  bookmark;
  industry
  productid
  feedResult=[];
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public route: ActivatedRoute, public product: ProductServiceService,private bookmarkService:BookmarkServices,private feedService:FeedService) {
    this.id = this.route.snapshot.paramMap.get('_id');
    console.log(this.id);
  this.product.token = this.storage.get('token');
  this.feedService.token=this.storage.get('token');
  }
  panelOpenState = false;
id;

  ngOnInit() {
this.product.getOneProduct(this.id).subscribe(res => {
  this.productName=JSON.parse(res['_body']).productName;
  this.shortDescription=JSON.parse(res['_body']).shortDescription;
  this.MinPrice=JSON.parse(res['_body']).minPrice;
  this.MaxPrice=JSON.parse(res['_body']).maxPrice;
  this.Moq=JSON.parse(res['_body']).moq;
  this.Category=JSON.parse(res['_body']).category;
  this.Tfcode=JSON.parse(res['_body']).tfcode;
  this.Time=JSON.parse(res['_body']).Time;
  this.MatchScore=JSON.parse(res['_body']).matchScore;
  this.ProductInfo=JSON.parse(res['_body']).productInfo;
  this.category=JSON.parse(res['_body']).category;
  this.bookmark=JSON.parse(res['_body']).bookmarks;
  this.industry=JSON.parse(res['_body']).industry
  this.productid=JSON.parse(res['_body'])._id;
console.log(this.productid)
  // this.ShortDescription=JSON.parse(res['_body']).shortDescription;
  this.Image=JSON.parse(res['_body']).Image
  console.log(JSON.parse(res['_body']))
});
    // this.feedService.GetFeed().subscribe(res=>{
    //     this.feed=JSON.parse(res['_body']);
    //     console.log(res);
    // })
this.product.getFeedById(this.id).subscribe(res=>{
this.feedResult=JSON.parse(res['_body']);
// console.log(JSON.parse(res['_body']))
})


  }
  // addProductBookmark(){
  //   this.bookmark=true;
  //   this.bookmarkService.addProductBookmarks(this.productid).subscribe(res=>{
  //     console.log(res);
  //   })
  // }
  // deleteProductBookmark(){
  //   this.bookmark=false
  //   this.bookmarkService.DeleteProductBookmark(this.productid).subscribe(res=>{
  //     console.log(res);
  //   })
    
  // }

}
