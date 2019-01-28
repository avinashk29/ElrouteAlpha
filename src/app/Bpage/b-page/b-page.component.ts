import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ProductServiceService} from '../../Service/product-service.service';
import {FeedService} from '../../Service/feed-service.service';
import 'rxjs/add/operator/filter';
import {UserService} from '../../Service/user-services.service';
@Component({
  selector: 'app-b-page',
  templateUrl: './b-page.component.html',
  styleUrls: ['./b-page.component.css']
})
export class BPageComponent implements OnInit , OnDestroy{


one = true;
two = false;
three = false;
four = false;
items;
 expand = [];
 token;
 userInfo;
groups;
CompanyName;
category;
city;
companyEmail;
companyType ;
companySize;
country;
Image;
industry;
mobile;
address ;
yearEstd;
website;
products = [];
comapnyId;
mycompanyId;
type;
feeds = [];
subscription;
url;
shortIntro;
noFeeds = false;
myCompany = false;
  constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService, public companyService: CompanyServiceService,
  public productService: ProductServiceService, public feedService: FeedService, public route: ActivatedRoute, private router: Router,
   public userService: UserService) {
    this.companyService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');

    this.subscription = this.router.events.subscribe(() => {
      this.comapnyId = this.route.snapshot.paramMap.get('id');
      this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {
        this.type = paramas.urltype;
      });
      this.mycompanyId = this.storage.get('companyId');
      if (this.type = 'product') {
        this.productService.getProduct(this.comapnyId).subscribe(res => {
            this.products = JSON.parse(res['_body']);

                });
        this.type = 'product';
      }

      this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
        this.CompanyName = JSON.parse(res['_body']).companyName;
        this.category = JSON.parse(res['_body']).category;
        this.city = JSON.parse(res['_body']).city;
        this.companyEmail = JSON.parse(res['_body']).companyEmail;
        this.companySize = JSON.parse(res['_body']).companySize;
        this.companyType = JSON.parse(res['_body']).companyType;
        this.country = JSON.parse(res['_body']).country;
        this.Image = JSON.parse(res['_body']).Image;
        console.log(this.Image);
        this.industry = JSON.parse(res['_body']).industry;
        this.mobile = JSON.parse(res['_body']).mobile;
        this.address = JSON.parse(res['_body']).address;
        this.yearEstd = JSON.parse(res['_body']).yearEstd;
        this.website = JSON.parse(res['_body']).website;
        this.shortIntro = JSON.parse(res['_body']).shortIntro;
        if (this.comapnyId === this.mycompanyId) {
          this.myCompany = true;
        } else {
          this.myCompany = false;
        }

      });
    });
  }

  ngOnInit() {
    // this.comapnyId = this.storage.get('companyId');
    this.feedService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']).Following);
      this.userInfo = JSON.parse(res['_body']).Following;
      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.userInfo[i] === this.comapnyId) {
            console.log('You Have to unfollow the company right now');
        } else {
          console.log('You have to follow the company');
        }
      }
    });
    this.companyService.token = this.storage.get('token');
    this.productService.token = this.storage.get('token');
    this.mycompanyId = this.storage.get('companyId');
    this.token = this.storage.get('token')
    this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {

      this.type = paramas.urltype;



    });


    this.items =  [
      {name: 'https://picsum.photos/200/300'},
      {name: 'https://picsum.photos/g/200/300'},
      {name: 'https://picsum.photos/200/300?image=0'},
      {name: 'https://picsum.photos/200/300/?blur'},
      {name: 'https://picsum.photos/200/300/?random'},
      {name: 'https://picsum.photos/200/300'},
      {name: 'https://picsum.photos/g/200/300'},
      {name: 'https://picsum.photos/200/300?image=0'},
      {name: 'https://picsum.photos/200/300/?blur'},
      {name: 'https://picsum.photos/200/300/?random'},
      {name: 'https://picsum.photos/200/300'},
      {name: 'https://picsum.photos/g/200/300'},
      {name: 'https://picsum.photos/200/300?image=0'},
      {name: 'https://picsum.photos/200/300/?blur'},
      {name: 'https://picsum.photos/200/300/?random'},
      {name: 'https://picsum.photos/200/300'},
      {name: 'https://picsum.photos/g/200/300'},
      {name: 'https://picsum.photos/200/300?image=0'},
      {name: 'https://picsum.photos/200/300/?blur'},
      {name: 'https://picsum.photos/200/300/?random'}
  ];
  this.feedService.GetFeed().subscribe(res => {
    this.feeds =  JSON.parse(res['_body']);
    if (!this.feeds.length){
      this.noFeeds = true;
    }
    });

  }
  editProduct(id){
    this.router.navigate(['/productEdit/' + id]);
  }
  EditBpage(){
    this.router.navigate(['/editcompany/' + this.mycompanyId]);
  }
  showTwo() {
    this.type = 'info';
  }
  showThree() {
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      this.products = JSON.parse(res['_body']);
    });
    this.type = 'product';
  }
  showFour() {
    this.type = 'contact';
  }

DeleteProduct(id) {
this.productService.DeleteProduct(id).subscribe(res => {
});
 }
 GotoBpage(){
   this.router.navigate(['/companyPage/'+this.comapnyId]);
 }
ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
