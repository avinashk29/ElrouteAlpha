import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from './Service/user-services.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { CompanyServiceService } from './Service/company-service.service';
import { ProductServiceService } from './Service/product-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ElrouteAlpha';
  token
  constructor(
    private userService: UserService,
    private companyService:CompanyServiceService,
    private productService:ProductServiceService,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService
    ){
      // this.token=this.storage.get('token');
      // console.log(this.token)
      }
ngOnInit(){
  this.userService.userData={};
  this.companyService.companyData={};
  this.productService.productData={};
 
    this.userService.getUserData().subscribe(res1 => {
      this.userService.userData = JSON.parse(res1['_body']);
      this.userService.bookmark =
       JSON.parse(res1['_body']).bookmarks.company.length + JSON.parse(res1['_body']).bookmarks.post.length
      + JSON.parse(res1['_body']).bookmarks.product.length + JSON.parse(res1['_body']).bookmarks.service.length;
       this.userService.following = JSON.parse(res1['_body']).following.length;
  
    });
   
 
}
}
