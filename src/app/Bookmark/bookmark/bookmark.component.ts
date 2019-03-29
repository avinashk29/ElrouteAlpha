import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserService } from 'src/app/Service/user-services.service';
import { ToastrService } from 'ngx-toastr';

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
    @Inject(LOCAL_STORAGE) public storage:WebStorageService, public notifcation: ToastrService) {

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

  // deleteProductBookmark(i,id){
  //   this.productId[i].bookm=true;
  //   this.bookmarkService.addProductBookmarks(id).subscribe(res=>{
  //     this.notifcation.success('Bookmark');

  //   })
  // }
  deleteProductBookmark(i,id){
<<<<<<< HEAD
    if (confirm('Are you sure you want to unbookmark the product?')){
=======
    if (confirm('Are you sure you want to delete the post')){
<<<<<<< HEAD
=======
>>>>>>> ea262564f8fa97a7edd9c7c71f4c4bce8102a101
>>>>>>> cf82758c946977b3e1c93e1431f2d089f8d598e7
>>>>>>> 05244dc50eddf2fb3d3a49a38d21be1de8682010
    this.productId[i].bookm=false;
    this.bookmarkService.DeleteProductBookmark(id).subscribe(res=>{
      this.notifcation.success('UnBookmark');
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
  }
}
