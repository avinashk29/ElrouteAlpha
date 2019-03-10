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

  userBookmark;
  bookmark
  mycompany
  creatorId
  mybookmark;
  feedResult=[];
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public route: ActivatedRoute, public productService: ProductServiceService,private bookmarkService:BookmarkServices,private feedService:FeedService,private UserService:UserService) {
    this.id = this.route.snapshot.paramMap.get('_id');
    console.log(this.id);
  this.productService.token = this.storage.get('token');
  this.feedService.token=this.storage.get('token');
  this.bookmarkService.token=this.storage.get('token')
  this.mycompany=this.storage.get('companyId');
  console.log(this.mycompany)
  }
  panelOpenState = false;
id;

  ngOnInit() {

this.productService.getOneProduct(this.id).subscribe(res => {
  console.log(JSON.parse(res['_body']))
  this.productService.productData = JSON.parse(res['_body']);
  console.log(this.productService.productData);
  if(JSON.parse(res['_body']).creator===this.mycompany){
    this.mybookmark=false;
  }else{
    this.mybookmark=true;
  }
});

    
this.productService.getFeedById(this.id).subscribe(res=>{
  console.log(JSON.parse(res['_body'])[0]);
this.feedResult=JSON.parse(res['_body']);
console.log(JSON.parse(res['_body']));
console.log(this.feedResult.length);
})
this.UserService.getUserData().subscribe(res=>{
  this.userBookmark=JSON.parse(res['_body']).bookmarks.product;
  for(let i=0;i<this.userBookmark.length;i++){
    if(this.id==this.userBookmark[i]){
      this.bookmark=false;
    }
  }
});

  }
  addProductBookmark(){
    this.bookmark=false
    this.bookmarkService.addProductBookmarks(this.id).subscribe(res=>{
    })
  }

  deleteProductBookmark(){
    this.bookmark=true
    this.bookmarkService.DeleteProductBookmark(this.id).subscribe(res=>{
    })
  }

}
