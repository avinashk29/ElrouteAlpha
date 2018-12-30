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
  constructor() { }

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
