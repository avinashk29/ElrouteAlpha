import { Component, OnInit, Input, Inject } from '@angular/core';
import { Event } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

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
name;
country;
city;
industry;
category;
email;
  constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService, public companyService: CompanyServiceService) {
    this.companyService.token = this.storage.get('token');
    this.token = this.storage.get('token');
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
    this.groups = [
     {
      card : [
        {
      type: 1,
        catogory: 'Laptp',
        productName: 'Product Name',
        company: 'Company ka Naam',
        device: 'computer',
        country: 'China',
        discription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

        },
          {
            type: 1,
            catogory: 'Lap',
            productName: 'Prot Name',
            company: 'Company',
            device: 'computer',
            country: 'China',
            discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

            },
            {
              type: 1,
              catogory: 'Lap',
              productName: 'Prot Name',
              company: 'Company',
              device: 'computer',
              country: 'China',
              discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

              },
              {
                type: 1,
                catogory: 'Lap',
                productName: 'Prot Name',
                company: 'Company',
                device: 'computer',
                country: 'China',
                discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                },
                {
                  type: 1,
                  catogory: 'Lap',
                  productName: 'Prot Name',
                  company: 'Company',
                  device: 'computer',
                  country: 'China',
                  discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                  },
                  {
                    type: 1,
                    catogory: 'Lap',
                    productName: 'Prot Name',
                    company: 'Company',
                    device: 'computer',
                    country: 'China',
                    discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                    },
                    {
                      type: 1,
                      catogory: 'Lap',
                      productName: 'Prot Name',
                      company: 'Company',
                      device: 'computer',
                      country: 'China',
                      discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                      },
                      {
                        type: 1,
                        catogory: 'Lap',
                        productName: 'Prot Name',
                        company: 'Company',
                        device: 'computer',
                        country: 'China',
                        discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                        }

           ]
     },

     {
      card : [
        {
      type: 1,
        catogory: 'Laptp',
        productName: 'Product Name',
        company: 'Company ka Naam',
        device: 'computer',
        country: 'China',
        discription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

        },
          {
            type: 1,
            catogory: 'Lap',
            productName: 'Prot Name',
            company: 'Company',
            device: 'computer',
            country: 'China',
            discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

            },
            {
              type: 1,
              catogory: 'Lap',
              productName: 'Prot Name',
              company: 'Company',
              device: 'computer',
              country: 'China',
              discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

              },
              {
                type: 1,
                catogory: 'Lap',
                productName: 'Prot Name',
                company: 'Company',
                device: 'computer',
                country: 'China',
                discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                },
                {
                  type: 1,
                  catogory: 'Lap',
                  productName: 'Prot Name',
                  company: 'Company',
                  device: 'computer',
                  country: 'China',
                  discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                  },
                  {
                    type: 1,
                    catogory: 'Lap',
                    productName: 'Prot Name',
                    company: 'Company',
                    device: 'computer',
                    country: 'China',
                    discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                    },
                    {
                      type: 1,
                      catogory: 'Lap',
                      productName: 'Prot Name',
                      company: 'Company',
                      device: 'computer',
                      country: 'China',
                      discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                      },
                      {
                        type: 1,
                        catogory: 'Lap',
                        productName: 'Prot Name',
                        company: 'Company',
                        device: 'computer',
                        country: 'China',
                        discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                        }

           ]
     },

     {
      card : [
        {
      type: 1,
        catogory: 'Laptp',
        productName: 'Product Name',
        company: 'Company ka Naam',
        device: 'computer',
        country: 'China',
        discription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

        },
          {
            type: 1,
            catogory: 'Lap',
            productName: 'Prot Name',
            company: 'Company',
            device: 'computer',
            country: 'China',
            discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

            },
            {
              type: 1,
              catogory: 'Lap',
              productName: 'Prot Name',
              company: 'Company',
              device: 'computer',
              country: 'China',
              discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

              },
              {
                type: 1,
                catogory: 'Lap',
                productName: 'Prot Name',
                company: 'Company',
                device: 'computer',
                country: 'China',
                discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                },
                {
                  type: 1,
                  catogory: 'Lap',
                  productName: 'Prot Name',
                  company: 'Company',
                  device: 'computer',
                  country: 'China',
                  discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                  },
                  {
                    type: 1,
                    catogory: 'Lap',
                    productName: 'Prot Name',
                    company: 'Company',
                    device: 'computer',
                    country: 'China',
                    discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                    },
                    {
                      type: 1,
                      catogory: 'Lap',
                      productName: 'Prot Name',
                      company: 'Company',
                      device: 'computer',
                      country: 'China',
                      discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                      },
                      {
                        type: 1,
                        catogory: 'Lap',
                        productName: 'Prot Name',
                        company: 'Company',
                        device: 'computer',
                        country: 'China',
                        discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                        }

           ]
     },

     {
      card : [
        {
      type: 1,
        catogory: 'Laptp',
        productName: 'Product Name',
        company: 'Company ka Naam',
        device: 'computer',
        country: 'China',
        discription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

        },
          {
            type: 1,
            catogory: 'Lap',
            productName: 'Prot Name',
            company: 'Company',
            device: 'computer',
            country: 'China',
            discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

            },
            {
              type: 1,
              catogory: 'Lap',
              productName: 'Prot Name',
              company: 'Company',
              device: 'computer',
              country: 'China',
              discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

              },
              {
                type: 1,
                catogory: 'Lap',
                productName: 'Prot Name',
                company: 'Company',
                device: 'computer',
                country: 'China',
                discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                },
                {
                  type: 1,
                  catogory: 'Lap',
                  productName: 'Prot Name',
                  company: 'Company',
                  device: 'computer',
                  country: 'China',
                  discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                  },
                  {
                    type: 1,
                    catogory: 'Lap',
                    productName: 'Prot Name',
                    company: 'Company',
                    device: 'computer',
                    country: 'China',
                    discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                    },
                    {
                      type: 1,
                      catogory: 'Lap',
                      productName: 'Prot Name',
                      company: 'Company',
                      device: 'computer',
                      country: 'China',
                      discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                      },
                      {
                        type: 1,
                        catogory: 'Lap',
                        productName: 'Prot Name',
                        company: 'Company',
                        device: 'computer',
                        country: 'China',
                        discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                        }

           ]
     },

     {
      card : [
        {
      type: 1,
        catogory: 'Laptp',
        productName: 'Product Name',
        company: 'Company ka Naam',
        device: 'computer',
        country: 'China',
        discription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

        },
          {
            type: 1,
            catogory: 'Lap',
            productName: 'Prot Name',
            company: 'Company',
            device: 'computer',
            country: 'China',
            discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

            },
            {
              type: 1,
              catogory: 'Lap',
              productName: 'Prot Name',
              company: 'Company',
              device: 'computer',
              country: 'China',
              discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

              },
              {
                type: 1,
                catogory: 'Lap',
                productName: 'Prot Name',
                company: 'Company',
                device: 'computer',
                country: 'China',
                discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                },
                {
                  type: 1,
                  catogory: 'Lap',
                  productName: 'Prot Name',
                  company: 'Company',
                  device: 'computer',
                  country: 'China',
                  discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                  },
                  {
                    type: 1,
                    catogory: 'Lap',
                    productName: 'Prot Name',
                    company: 'Company',
                    device: 'computer',
                    country: 'China',
                    discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                    },
                    {
                      type: 1,
                      catogory: 'Lap',
                      productName: 'Prot Name',
                      company: 'Company',
                      device: 'computer',
                      country: 'China',
                      discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                      },
                      {
                        type: 1,
                        catogory: 'Lap',
                        productName: 'Prot Name',
                        company: 'Company',
                        device: 'computer',
                        country: 'China',
                        discription: 'It is a long established fact that a reader will be d of a page when looking at its layout.'

                        }

           ]
     }
  ];
  }

  ngOnInit() {
    for (let i = 0; i < this.groups.length; i++) {
      this.expand[i] = false;
      console.log(this.expand[i]);
    }
    this.companyService.token=this.storage.get('token');
this.companyService.GetCompany().subscribe(res => {
  console.log(JSON.parse(res['_body'])[0].companyName);
  this.storage.set('companyName',  JSON.parse(res['_body'])[0].companyName);
  this.storage.set('country',  JSON.parse(res['_body'])[0].country);
  this.storage.set('city',  JSON.parse(res['_body'])[0].city);
  this.storage.set('companyEmail',  JSON.parse(res['_body'])[0].companyEmail);
  this.storage.set('industry',  JSON.parse(res['_body'])[0].industry);
  this.storage.set('category',  JSON.parse(res['_body'])[0].category);
  this.storage.set('companyId',JSON.parse(res['_body'])[0].companyId);
  this.name = this.storage.get('companyName');
  this.country = this.storage.get('country');
  this.city = this.storage.get('city');
  this.email = this.storage.get('companyEmail');
  this.industry = this.storage.get('industry');
  this.category = this.storage.get('category');
  console.log(this.storage.get('token'))
  console.log(this.email)
  console.log(this.city);
  console.log(this.country);
  console.log(this.name);
  


});
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

  onExpand(i) {
    console.log(i);
    if (this.expand[i] === true) {
             this.expand[i] = false;
     } else {
      this.expand[i] = true;
    }
  }
}

