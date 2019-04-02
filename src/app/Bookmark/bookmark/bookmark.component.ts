import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserService } from 'src/app/Service/user-services.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  product=[]
  bookmark=[]
  userBookmark=[]
  productResult=[]
  productId;
  loading
  noResult = false;
  constructor(public bookmarkService:BookmarkServices,
    private userService:UserService,
    @Inject(LOCAL_STORAGE) public storage:WebStorageService, public notifcation: ToastrService) {


    this.bookmarkService.token = this.storage.get('token');

    this.loading=true;

  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res=>{
      this.userBookmark=JSON.parse(res['_body']).bookmarks.product;
      this.bookmarkService.getBookmarkProduct().subscribe(response=>{
        this.product=JSON.parse(response['_body']);
        this.productId=JSON.parse(response['_body']);
      // console.log(this.product);
        if(!this.product.length){
           this.noResult = true;
        }
        this.bookmarkService.productBookmark=JSON.parse(response['_body']);
               
             this.loading=false;
      });
    });

  }

  addProductBookmark(i,id){
    this.productId[i].bookm=true;
    this.bookmarkService.addProductBookmarks(id).subscribe(res=>{
      this.notifcation.success('Bookmark');

    })
  }
  deleteProductBookmark(i,id){

    if (confirm('Are you sure you want to unbookmark the product?')){

    this.productId[i].bookm=false;
    this.bookmarkService.DeleteProductBookmark(id).subscribe(res=>{
      this.notifcation.success('UnBookmark');
      this.bookmarkService.getBookmarkProduct().subscribe(response=>{
        this.product=JSON.parse(response['_body']);
        this.productId=JSON.parse(response['_body']);
      
        if(!this.product.length){
           this.noResult = true;
        }
        this.bookmarkService.productBookmark=JSON.parse(response['_body']);
                

      });
    });
  }
  }
}