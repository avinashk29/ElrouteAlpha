import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SearchService } from 'src/app/Service/search.service';
import {CompanySearchComponent} from 'src/app/Search/company-search/company-search.component'

@Component({
  selector: 'app-s-page-header',
  templateUrl: './s-page-header.component.html',
  styleUrls: ['./s-page-header.component.css']
})
export class SPageHeaderComponent implements OnInit {
  othercomponent:CompanySearchComponent
word;
page;
pagecounter
  constructor(public route: ActivatedRoute,private search:SearchService) {
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
  
  }

  ngOnInit() {
  }

}
