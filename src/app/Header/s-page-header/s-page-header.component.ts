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
  othercomponent:CompanySearchComponent;
word;
page;
pagecounter;
  constructor(public route: ActivatedRoute,public search:SearchService) {
    
    this.route.params.subscribe(params=>{
      this.word=params.word;
      this.page=params.page;
      this.search.onSearch(this.word , this.page).subscribe(res => {
        console.log(JSON.parse(res['_body']));
      });
    })
   

  }

  ngOnInit() {
    console.log(this.search.feedResultLength , this.search.companyResultLength , this.search.productResultLength);
  }

}
