import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { FeedService } from 'src/app/Service/feed-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { UserService } from 'src/app/Service/user-services.service';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/Auth/login/login.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
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
  userFeed
  mybookmark;
  feedResult=[];
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public route: ActivatedRoute, private router:Router, public productService: ProductServiceService,public dialog: MatDialog,private bookmarkService:BookmarkServices,private feedService:FeedService,private UserService:UserService, public notification: ToastrService) {
   this.router.events.subscribe((event:NavigationEnd) =>{
     window.scrollTo(0,0);
   });

    this.id = this.route.snapshot.paramMap.get('_id');
    // console.log(this.id);
  this.productService.token = this.storage.get('token');
  this.feedService.token=this.storage.get('token');
  this.bookmarkService.token=this.storage.get('token')
  this.mycompany=this.storage.get('companyId');
  // console.log(this.mycompany)
  }
  panelOpenState = false;
id;
token;
  ngOnInit() {
    this.token =this.storage.get('token');
    this.productService.token = this.storage.get('token');
this.productService.getOneProduct(this.id).subscribe(res => {
  // console.log(JSON.parse(res['_body']))
  this.productService.productData = JSON.parse(res['_body']);
  // console.log(this.productService.productData);
  if(JSON.parse(res['_body']).creator===this.mycompany){
    this.mybookmark=false;
  }else{
    this.mybookmark=true;
  }
});


this.productService.getFeedById(this.id).subscribe(res=>{
this.feedResult=JSON.parse(res['_body']);

});
  }


  addProductBookmark(){
    // this.bookmark=false
    this.productService.token = this.storage.get('token');
    this.bookmarkService.addProductBookmarks(this.id).subscribe(res=>{
      
        this.productService.productData.bookm=true;
        this.notification.success('Added to your product bookmark')
      
      

    })
  }

  deleteProductBookmark(){
    // this.bookmark=true
    
    this.productService.token = this.storage.get('token');
    this.bookmarkService.DeleteProductBookmark(this.id).subscribe(res=>{

      this.productService.productData.bookm=false
        this.notification.success('Removed from your product bookmark')
        
      
    })
  }
 addFeedBookmark(i,id){
  
  this.bookmarkService.addPostBookmark(id).subscribe(res=>{
    this.feedResult[i].bookm=true;
    this.feedResult[i].bookmarks.push(id);
  })

}
removeFeedBookmark(i,id){
  
this.bookmarkService.DeletePostBookmark(id).subscribe(res=>{
  this.feedResult[i].bookm=false;
  this.feedResult[i].bookmarks.pop(id);

})
}

openLogin() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  this.dialog.open(LoginComponent, dialogConfig);
}
goToLink(url: string){
  url = url.trim();
  if(url.indexOf('http')>-1){
    window.open(url, "_blank");
  }
 else{
  window.open('http://'+url, "_blank");
 }
}
}
