import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-s-page-header',
  templateUrl: './s-page-header.component.html',
  styleUrls: ['./s-page-header.component.css']
})
export class SPageHeaderComponent implements OnInit {
word;
page;
  constructor(public route: ActivatedRoute) {
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
    console.log(this.word , this.page);
  }

  ngOnInit() {
  }

}
