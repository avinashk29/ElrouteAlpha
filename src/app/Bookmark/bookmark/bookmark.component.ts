import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserService } from 'src/app/Service/user-services.service';

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
  noResult = false;
  constructor(public bookmarkService:BookmarkServices,
    private userService:UserService,
    @Inject(LOCAL_STORAGE) public storage:WebStorageService) {

    this.bookmarkService.token = this.storage.get('token');



  }

  ngOnInit() {
    this.userService.getUserData().subscribe(res=>{
      this.userBookmark=JSON.parse(res['_body']).bookmarks.product;
      this.bookmarkService.getBookmarkProduct().subscribe(response=>{
        this.product=JSON.parse(response['_body']);
        this.productId=JSON.parse(response['_body']);
        console.log(this.product);
        if(!this.product.length){
           this.noResult = true;
        }
        this.bookmarkService.productBookmark=JSON.parse(response['_body']);
                for(let i = 0; i < this.userBookmark.length; i++) {
                  for(let j = 0;j < this.productId.length; j++) {
                       if(this.productId[j]==null){

                       }else{
                        if(this.userBookmark[i] == this.productId[j]._id) {
                         this.productId[j].bookm=true;
                        } else  {
                         // this.productId[j].bookm=true;
                        }
                       }
                   }
             }

      });
    });

  }

  addProductBookmark(i,id){
    this.productId[i].bookm=true;
    this.bookmarkService.addProductBookmarks(id).subscribe(res=>{
    })
  }
  deleteProductBookmark(i,id){
    this.productId[i].bookm=false;
    this.bookmarkService.DeleteProductBookmark(id).subscribe(res=>{
    })
  }

}
