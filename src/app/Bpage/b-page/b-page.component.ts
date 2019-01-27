import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ProductServiceService} from '../../Service/product-service.service';
import {FeedService} from '../../Service/feed-service.service';
import 'rxjs/add/operator/filter';
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
  public productService: ProductServiceService, public feedService: FeedService, public route: ActivatedRoute,private router: Router) {
    this.companyService.token = this.storage.get('token');
    this.subscription = this.router.events.subscribe(() => {
      this.comapnyId = this.route.snapshot.paramMap.get('id');
      this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {
        console.log(paramas);
        this.type = paramas.urltype;
        console.log(this.type);
      });
      this.mycompanyId = this.storage.get('companyId');
      if (this.type = 'product') {
        this.productService.getProduct(this.comapnyId).subscribe(res => {
            this.products = JSON.parse(res['_body']);
            console.log(JSON.parse(res['_body']));
            console.log('i am working');
                });
        this.type = 'product';
      }
      this.companyService.GetoneCompany(this.comapnyId).subscribe(res=>{
        console.log(res+'company response');
      })
    })
  }

  ngOnInit() {
    // this.comapnyId = this.storage.get('companyId');
    this.feedService.token = this.storage.get('token');

    console.log(this.comapnyId)
    console.log(this.comapnyId);
    this.companyService.token = this.storage.get('token');
    this.productService.token = this.storage.get('token');
    this.mycompanyId = this.storage.get('companyId');
    this.token = this.storage.get('token')
    this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas =>{
      console.log(paramas);
      this.type = paramas.urltype;
      console.log(this.type);


    });

    // if (this.type ='product'){
    //   this.productService.getProduct(this.comapnyId).subscribe(res => {
    //       this.products = JSON.parse(res['_body']);
    //       console.log(JSON.parse(res['_body']));
    //       console.log("i am working")
    //           });
    //   this.type = 'product';
    // }
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
    console.log(JSON.parse(res['_body']));
    this.feeds =  JSON.parse(res['_body']);
    if (!this.feeds.length){
      this.noFeeds = true;
    }
    });
    this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.CompanyName = JSON.parse(res['_body']).companyName;
      this.category = JSON.parse(res['_body']).category;
      this.city = JSON.parse(res['_body']).city;
      this.companyEmail = JSON.parse(res['_body']).companyEmail;
      this.companySize = JSON.parse(res['_body']).companySize;
      this.companyType = JSON.parse(res['_body']).companyType;
      this.country = JSON.parse(res['_body']).country;
      this.Image = JSON.parse(res['_body']).Image;
      this.industry = JSON.parse(res['_body']).industry;
      this.mobile = JSON.parse(res['_body']).mobile;
      this.address = JSON.parse(res['_body']).address;
      this.yearEstd = JSON.parse(res['_body']).yearEstd;
      this.website = JSON.parse(res['_body']).website;
      this.shortIntro = JSON.parse(res['_body']).shortIntro;
      if (this.comapnyId === this.mycompanyId) {
        console.log('MY OWN COMPANY');
        this.myCompany = true;
      } else {
        console.log('diffrent Company');
        this.myCompany = false;
      }
    });

  }
  editProduct(id){
    this.router.navigate(['/productEdit/'+id]);
  }
  EditBpage(){
    console.log(this.mycompanyId)
    this.router.navigate(['editcompany']);
  }
  showTwo() {
    this.type = 'info';
  }
  showThree() {
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.products = JSON.parse(res['_body']);
    });
    this.type = 'product';
  }
  showFour() {
    this.type = 'contact';
  }

DeleteProduct(id){
this.productService.DeleteProduct(id).subscribe(res=>{
console.log(res);
}) 
 }
 GotoBpage(){
   this.router.navigate(['/companyPage/'+this.comapnyId]);
 }
  // onExpand(i) {
  //   console.log(i);
  //   if (this.expand[i] === true) {
  //            this.expand[i] = false;
  //    } else {
  //     this.expand[i] = true;
  //   }
  // }
ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
