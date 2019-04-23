import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from './Service/user-services.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { CompanyServiceService } from './Service/company-service.service';
import { ProductServiceService } from './Service/product-service.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = "World's Best B2B Platform - Showcase your Business Story Worldwide | Elroute";
  token;
  companyId;
  constructor(
    private userService: UserService,
    private companyService:CompanyServiceService,
    private productService:ProductServiceService,
    public title:Title,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService
    ){
      this.token=this.storage.get('token');

      // this.companyId =  this.storage.get('companyId');
    // console.log(this.companyId);
    
      }
ngOnInit(){
  this.title.setTitle("World's Best B2B Platform - Showcase your Business Story Worldwide | Elroute");
  
  this.userService.userData={};
  this.companyService.companyData={};
  this.productService.productData={};
  this.productService.products=[];
    // this.userService.getUserData().subscribe(res1 => {
    //   this.userService.userData = JSON.parse(res1['_body']);
    //   // this.userService.bookmark =
    //   //  JSON.parse(res1['_body']).bookmarks.company.length + JSON.parse(res1['_body']).bookmarks.post.length
    //   // + JSON.parse(res1['_body']).bookmarks.product.length + JSON.parse(res1['_body']).bookmarks.service.length;
    //   //  this.userService.following = JSON.parse(res1['_body']).following.length;
  
    // });
   
 
}
}
