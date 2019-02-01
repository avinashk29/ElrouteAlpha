import { Component, OnInit, Inject, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ProductServiceService} from '../../Service/product-service.service';
import {FeedService} from '../../Service/feed-service.service';
import 'rxjs/add/operator/filter';
import {UserService} from '../../Service/user-services.service';
import { FormControl , FormGroup} from '@angular/forms';
import { FollowService } from 'src/app/Service/follow-service.service';
@Component({
  selector: 'app-b-page',
  templateUrl: './b-page.component.html',
  styleUrls: ['./b-page.component.css']
})
export class BPageComponent implements OnInit , OnDestroy {


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
// companyType ;
// companySize;
country;
// Image;
industry;
// mobile;
// address ;
// yearEstd;
website;
workingHours;
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
editwebsite = false;
editworkingHours = false;
editshortIntro = false;
address;
companySize;
yearEstd;
revenue;
companyFollowers = [];
Follower = false;
BForm = new FormGroup ({
   website: new FormControl(''),
   Image: new FormControl(''),
   workingHours: new FormControl(),
  shortIntro: new FormControl(''),
  facebook: new FormControl(''),
  linkedin: new FormControl(''),
  google: new FormControl('')
  });
  constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService, public companyService: CompanyServiceService,
  public productService: ProductServiceService, public feedService: FeedService, public route: ActivatedRoute, private router: Router,
   public userService: UserService, public follow: FollowService) {
    this.companyService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');

    this.subscription = this.router.events.subscribe(() => {
      this.comapnyId = this.route.snapshot.paramMap.get('id');
      this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {
        this.type = paramas.urltype;
        this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
          this.CompanyName = JSON.parse(res['_body']).companyName;
          this.category = JSON.parse(res['_body']).category;
          this.city = JSON.parse(res['_body']).city;
          this.companyEmail = JSON.parse(res['_body']).companyEmail;
          this.country = JSON.parse(res['_body']).country;
          this.industry = JSON.parse(res['_body']).industry;
          this.website = JSON.parse(res['_body']).website;
          this.workingHours = JSON.parse(res['_body']).workingHours;
          this.shortIntro = JSON.parse(res['_body']).shortIntro,
          this.address = JSON.parse(res['_body']).address,
          this.companySize = JSON.parse(res['_body']).companySize,
          this.yearEstd = JSON.parse(res['_body']).yearEstd,
          this.revenue = JSON.parse(res['_body']).revenue,
          this.companyFollowers =  JSON.parse(res['_body']).Followers.length;
          console.log(this.companyFollowers);
          console.log(JSON.parse(res['_body']));
          this.BForm.patchValue({
           website: JSON.parse(res['_body']).website,
           Image: JSON.parse(res['_body']).Image,
           workingHours: JSON.parse(res['_body']).workingHours,
           shortIntro: JSON.parse(res['_body']).shortIntro,

          //  facebook: JSON.parse(res['_body']).socialLinks.facebook,
          //  linkedin: JSON.parse(res['_body']).socialLinks.linkedin,
          //  google: JSON.parse(res['_body']).socialLinks.google,

          });

          if (this.comapnyId === this.mycompanyId) {
            this.myCompany = true;
          } else {
            this.myCompany = false;
          }
        });
      });
      this.mycompanyId = this.storage.get('companyId');
      if (this.type = 'product') {
        this.productService.getProduct(this.comapnyId).subscribe(res => {
            this.products = JSON.parse(res['_body']);

                });
        this.type = 'product';
      }
    });
  }

  ngOnInit() {
    // this.comapnyId = this.storage.get('companyId');
    this.follow.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']).Following);
      this.userInfo = JSON.parse(res['_body']).Following;
      for (let i = 0; i < this.userInfo.length; i++) {
        if(this.userInfo.length === 0){
          this.Follower = false;
        } else{
          if (this.userInfo[i] === this.comapnyId) {
            console.log('You Have to unfollow the company right now');
            this.Follower = true;
        } else {
          this.Follower = false;
          console.log('You have to follow the company');
        }
        }

      }
    });
    this.feedService.token = this.storage.get('token');
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
  editProduct(id) {
    this.router.navigate(['/productEdit/' + id]);
  }
  EditBpage() {
    console.log(this.mycompanyId)
    this.router.navigate(['company-form2']);
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
 GotoBpage() {
   this.router.navigate(['/companyPage/' + this.comapnyId]);
 }
 onEditBpage(key, content: HTMLInputElement ) {
   console.log(key);
  console.log(content.value);
   const formData = new FormData();
    formData.append(key, content.value);
  this.companyService.UpdateCompany(formData).subscribe(res => {
     console.log(JSON.parse(res['_body']));
   });
  console.log(this.BForm.value);
  this.editwebsite = false;
  this.editworkingHours = false;
  this.editshortIntro = false;
 }
 onCompanyFollow() {
  this.follow.addFollow(this.comapnyId).subscribe(res => {
    console.log(res);
})
console.log('i am working follow');
this.Follower = true;
 }
 onCompanyUnfollow() {
  this.follow.Unfollow(this.comapnyId).subscribe(res => {
    console.log(res);
})
console.log('i am working unfollow');
this.Follower = false;
 }
ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
