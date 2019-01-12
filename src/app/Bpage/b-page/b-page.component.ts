import { Component, OnInit, Input, Inject } from '@angular/core';
import { Event } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ProductServiceService} from '../../Service/product-service.service';
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
  constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService, public companyService: CompanyServiceService,
  public productService: ProductServiceService) {
    this.companyService.token = this.storage.get('token');
    this.productService.token = this.storage.get('token');
    this.token = this.storage.get('token');
    this.companyService.GetCompany().subscribe(res => {
      console.log(JSON.parse(res['_body'])[0]);
      this.CompanyName = JSON.parse(res['_body'])[0].companyName;
      this.category = JSON.parse(res['_body'])[0].category;
      this.city = JSON.parse(res['_body'])[0].city;
      this.companyEmail = JSON.parse(res['_body'])[0].companyEmail;
      this.companySize = JSON.parse(res['_body'])[0].companySize;
      this.companyType = JSON.parse(res['_body'])[0].companyType;
      this.country = JSON.parse(res['_body'])[0].country;
      this.image = JSON.parse(res['_body'])[0].image;
      this.industry = JSON.parse(res['_body'])[0].industry;
      this.mobile = JSON.parse(res['_body'])[0].mobile;
      this.address = JSON.parse(res['_body'])[0].address;
      this.yearEstd = JSON.parse(res['_body'])[0].yearEstd;
      this.website = JSON.parse(res['_body'])[0].website;
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

    this.productService.getProduct().subscribe(res => {
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

