import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { FeedService } from 'src/app/Service/feed-service.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  ProductName;
  ShortDescription;
  MinPrice;
  MaxPrice;
  Moq;
  Category;
  Tfcode;
  Time;
  MatchScore;
  ProductInfo;
  feed=[]
  image;
  feedResult=[];
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public route: ActivatedRoute, public product: ProductServiceService,private feedService:FeedService) {
    this.id = this.route.snapshot.paramMap.get('_id');
    console.log(this.id);
  this.product.token = this.storage.get('token');
  this.feedService.token=this.storage.get('token');
  }
  panelOpenState = false;
id;

  ngOnInit() {
this.product.getOneProduct(this.id).subscribe(res => {
  this.ProductName=JSON.parse(res['_body']).productName;
  this.ShortDescription=JSON.parse(res['_body']).shortDescription;
  this.MinPrice=JSON.parse(res['_body']).minPrice;
  this.MaxPrice=JSON.parse(res['_body']).maxPrice;
  this.Moq=JSON.parse(res['_body']).moq;
  this.Category=JSON.parse(res['_body']).category;
  this.Tfcode=JSON.parse(res['_body']).tfcode;
  this.Time=JSON.parse(res['_body']).Time;
  this.MatchScore=JSON.parse(res['_body']).matchScore;
  this.ProductInfo=JSON.parse(res['_body']).productInfo;
  this.ShortDescription=JSON.parse(res['_body']).shortDescription;
  this.image=JSON.parse(res['_body']).image
  console.log(this.ProductName)
});
    this.feedService.GetFeed().subscribe(res=>{
        this.feed=JSON.parse(res['_body']);
        console.log(res);
    })
this.product.getFeedById(this.id).subscribe(res=>{
this.feedResult=JSON.parse(res['_body']);
console.log(this.feedResult)
})


  }

}
