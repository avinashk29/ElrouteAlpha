import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { FeedService } from 'src/app/Service/feed-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { UserService } from 'src/app/Service/user-services.service';
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
  userBookmark;
  bookmark
  industry
  productid
  mycompany
  creatorId
  mybookmark;
  feedResult=[];
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public route: ActivatedRoute, public product: ProductServiceService,private bookmarkService:BookmarkServices,private feedService:FeedService,private UserService:UserService) {
    this.id = this.route.snapshot.paramMap.get('_id');
    console.log(this.id);
  this.product.token = this.storage.get('token');
  this.feedService.token=this.storage.get('token');
  this.bookmarkService.token=this.storage.get('token')
  this.mycompany=this.storage.get('companyId');
  console.log(this.mycompany)
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
  // this.bookmark=JSON.parse(res['_body']).bookmarks;
  this.industry=JSON.parse(res['_body']).industry
  this.creatorId=JSON.parse(res['_body']).creator;
console.log(this.creatorId)

  this.Image=JSON.parse(res['_body']).Image
  console.log(JSON.parse(res['_body']))
  if(this.creatorId===this.mycompany){
    this.mybookmark=false;
  }else{
    this.mybookmark=true;
  }
});

    // this.feedService.GetFeed().subscribe(res=>{
    //     this.feed=JSON.parse(res['_body']);
    //     console.log(res);
    // })
this.product.getFeedById(this.id).subscribe(res=>{
this.feedResult=JSON.parse(res['_body']);
console.log(JSON.parse(res['_body']))
})
this.UserService.getUserData().subscribe(res=>{
  this.userBookmark=JSON.parse(res['_body']).bookmarks.product;
  console.log(this.userBookmark.length);  
for(let i=0;i<this.userBookmark.length;i++){
  if(this.id==this.userBookmark[i])
  {
    this.bookmark=false;
  }
  else{
    // this.bookmark=true;
  }
}

})

  }
  addProductBookmark(){
    this.bookmark=false
    this.bookmarkService.addProductBookmarks(this.id).subscribe(res=>{
      console.log(res);
    })
  }
  deleteProductBookmark(){
    this.bookmark=true
    this.bookmarkService.DeleteProductBookmark(this.id).subscribe(res=>{
      console.log(res);
    })
    
  }

}
