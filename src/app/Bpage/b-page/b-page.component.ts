import { Component, OnInit, Input } from '@angular/core';
import { Event } from '@angular/router';

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

groups;
  constructor() {
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

