import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import {LoginComponent} from '../../Auth/login/login.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { UserService} from '../../Service/user-services.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import {ActivatedRoute} from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
show = false;
results = [];
notlogin = true;
token;
word;
page;
len;
productId=[]
unbookmarked = true;
userBookmark=[]
productResult=[]
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
 public search: SearchService, private bookmarkService: BookmarkServices,
 public dialog: MatDialog, public userService: UserService, public product: ProductServiceService,
 public route: ActivatedRoute, public companyService: CompanyServiceService
 ) {

  }
  ngOnInit() {
    this.bookmarkService.token = this.storage.get('token');
    this.userService.token =  this.storage.get('token');
    this.product.token = this.storage.get('token');
    this.companyService.token = this.storage.get('token');
    this.token =  this.storage.get('token');
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
    this.userService.getUserData().subscribe(res=>{
      this.userBookmark=JSON.parse(res['_body']).bookmarks.product;
      console.log(this.userBookmark.length)
      console.log(JSON.parse(res['_body']));
      this.search.onSearch(this.word,this.page).subscribe(response=>{
        this.productResult=JSON.parse(response['_body']);
        this.productId=JSON.parse(response['_body']);
        console.log(this.productId.length);
        // console.log(this.productId.length)
        this.bookmarkService.productBookmark=JSON.parse(response['_body']);
        console.log(this.bookmarkService.productBookmark.length)
                for(let i = 0; i < this.userBookmark.length; i++) {
                  console.log(this.userBookmark[i]);
                  for(let j = 0;j < this.productId.length; j++) {
                       if(this.productId[j]==null){

                       }else{
                        console.log(this.productId[j]._id);
                        if(this.userBookmark[i] == this.productId[j]._id) {
                         console.log(this.productId[j]._id);
                         this.productId[j].bookm=true;
                        } else  {
                         // this.productId[j].bookm=true;
                         console.log(this.productId[j]._id);
                        }
                       }
                   }      
             }
              
      })
    })                                                  
    console.log(this.token);
    if (this.token != null) {
      this.notlogin = false;
    }
    console.log(this.notlogin);
  }
unbookmark(id) {
  this.unbookmarked = true;
  }
openLogin() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  this.dialog.open(LoginComponent, dialogConfig);
}
serviceBookmark(id) {
this.bookmarkService.addServiceBookmark(id).subscribe(res => {
  console.log(res);
});
}
showProduct(id) {
// this.product.getOneproduct(id).subscribe(res => {
//  console.log(JSON.parse(res['_body']));
// });
}
// openCompany(id) {
// this.companyService.GetoneCompany(id).subscribe(res => {
//   console.log(res.json);
// });
// }
bookmark(id) {
  console.log(id);
  this.bookmarkService.addPostBookmark(id).subscribe(res =>{
    console.log(res);
  });
  this.unbookmarked = false;
  }

  addProductBookmark(i,id){
    this.productId[i].bookm=true;
    this.bookmarkService.addProductBookmarks(id).subscribe(res=>{
      console.log(res);
    })
  }
  deleteProductBookmark(i,id){
    this.productId[i].bookm=false;
    this.bookmarkService.DeleteProductBookmark(id).subscribe(res=>{
      console.log(res);
    })
    
  }
}
