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
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
 public search: SearchService, private bookmarksService: BookmarkServices,
 public dialog: MatDialog, public userService: UserService, public product: ProductServiceService,
 public route: ActivatedRoute, public companyService: CompanyServiceService
 ) {

  }
  ngOnInit() {
    this.bookmarksService.token = this.storage.get('token');
    this.userService.token =  this.storage.get('token');
    this.product.token = this.storage.get('token');
    this.companyService.token = this.storage.get('token');
    this.token =  this.storage.get('token');
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
   this.search.onSearch(this.word , this.page);
    console.log(this.token);
    if (this.token != null) {
      this.notlogin = false;
    }
    console.log(this.notlogin);
  }

bookmark(id) {
console.log(id);
this.userService.getUserData().subscribe(res => {
  // console.log(JSON.parse(res['_body']).bookmarks.product);
  let length = JSON.parse(res['_body']).bookmarks.product.length;
  if(length==0){
    this.bookmarksService.addProductBookmarks(id).subscribe(res=>{})
  }
  for (let i = 0; i < length; i++) {
 //   console.log(JSON.parse(res['_body']).bookmarks.product[i]);
     if (id === JSON.parse(res['_body']).bookmarks.product[i]) {
      JSON.parse(res['_body']).bookmarks.product[i].pop;
      console.log('removed');

     } else{
        this.bookmarksService.addProductBookmarks(id).subscribe(res=>{
          console.log(res);
        })
     }
  }

});
// this.bookmarksService.addProductBookmarks(id).subscribe(res => {
//   console.log(res);
// });
}
openLogin() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  this.dialog.open(LoginComponent, dialogConfig);
}
serviceBookmark(id) {
this.bookmarksService.addServiceBookmark(id).subscribe(res => {
  console.log(res);
});
}
showProduct(id) {
// this.product.getOneproduct(id).subscribe(res => {
//  console.log(JSON.parse(res['_body']));
// });
}
openCompany(id) {
this.companyService.GetoneCompany(id).subscribe(res => {
  console.log(res.json);
});
}
}
