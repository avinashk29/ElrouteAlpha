import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ProductServiceService} from '../../Service/product-service.service';
import {FeedService} from '../../Service/feed-service.service';
@Component({
  selector: 'app-b-page',
  templateUrl: './b-page.component.html',
  styleUrls: ['./b-page.component.css']
})
export class BPageComponent implements OnInit {


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
image;
industry;
mobile;
address ;
yearEstd;
website;
products;
comapnyId;
mycompanyId;
  constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService, public companyService: CompanyServiceService,
  public productService: ProductServiceService, public feedService: FeedService, public route: ActivatedRoute) {
    this.comapnyId = this.route.snapshot.paramMap.get('id');
    console.log(this.comapnyId);
    this.companyService.token = this.storage.get('token');
    this.productService.token = this.storage.get('token');
    this.mycompanyId = this.storage.get('companyId');
    this.token = this.storage.get('token');
    this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
      console.log(JSON.parse(res['_body'])._id);
      this.CompanyName = JSON.parse(res['_body']).companyName;
      this.category = JSON.parse(res['_body']).category;
      this.city = JSON.parse(res['_body']).city;
      this.companyEmail = JSON.parse(res['_body']).companyEmail;
      this.companySize = JSON.parse(res['_body']).companySize;
      this.companyType = JSON.parse(res['_body']).companyType;
      this.country = JSON.parse(res['_body']).country;
      this.image = JSON.parse(res['_body']).image;
      this.industry = JSON.parse(res['_body']).industry;
      this.mobile = JSON.parse(res['_body']).mobile;
      this.address = JSON.parse(res['_body']).address;
      this.yearEstd = JSON.parse(res['_body']).yearEstd;
      this.website = JSON.parse(res['_body']).website;
      if (this.comapnyId === this.mycompanyId) {
        console.log('MY OWN COMPANY');
      } else {
        console.log('diffrent Company');
      }
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

    this.productService.getProduct(this.comapnyId).subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.products = JSON.parse(res['_body']);
    });
  }

  ngOnInit() {
    // for (let i = 0; i < this.groups.length; i++) {
    //   this.expand[i] = false;
    //   console.log(this.expand[i]);
    // }

  }
  showTwo() {
    this.one = false;
    this.two = true;
    this.three = false;
    this.four = false;
  }
  showThree() {
    this.one = false;
    this.two = false;
    this.three = true;
    this.four = false;
  }
  showFour() {
    this.one = false;
    this.two = false;
    this.three = false;
    this.four = true;
  }

  // onExpand(i) {
  //   console.log(i);
  //   if (this.expand[i] === true) {
  //            this.expand[i] = false;
  //    } else {
  //     this.expand[i] = true;
  //   }
  // }
}

