import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import {LoginComponent} from '../../Auth/login/login.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { UserService} from '../../Service/user-services.service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
userBookmark=[];
productResult=[];
noResult = false;
loading;
unfilteredproductResult;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
 public search: SearchService, private bookmarkService: BookmarkServices,
 public dialog: MatDialog, public userService: UserService, public product: ProductServiceService,
 public route: ActivatedRoute, public companyService: CompanyServiceService,private router:Router,
 public notification: ToastrService
 ) {
  this.loading=true;
  this.route.params.subscribe(params=>{
    this.loading=true;
    this.search.token =this.storage.get('token');
    this.search.onSearch(params.word,params.page).subscribe(response => {
      this.loading=true;
      this.productResult=JSON.parse(response['_body']).searchResult;
           this.loading=false;
    });
  });
  }
  
  ngOnInit() {
    this.loading=true;
    this.bookmarkService.token = this.storage.get('token');
    this.product.token = this.storage.get('token');
    this.token =  this.storage.get('token');
    this.search.token =this.storage.get('token');
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
  } 
   
        
       


openLogin() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  this.dialog.open(LoginComponent, dialogConfig);
}



  addProductBookmark(i,id){
    
    this.bookmarkService.addProductBookmarks(id).subscribe(res=>{
      this.productResult[i].bookm=true;
      this.notification.success('Bookmark');
    });
  }
  deleteProductBookmark(i,id){
    
    this.bookmarkService.DeleteProductBookmark(id).subscribe(res=>{
      this.productResult[i].bookm=false;
      this.notification.success('UnBookmark');
    })
  }
  gotoProductPage(id){
    this.router.navigate(['/product-page/'+id])
  }
}
