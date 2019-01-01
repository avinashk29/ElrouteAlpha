import { Component, OnInit } from '@angular/core';

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
  }

  ngOnInit() {
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
}
