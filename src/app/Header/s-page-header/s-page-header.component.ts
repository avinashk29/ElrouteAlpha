import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SearchService } from 'src/app/Service/search.service';
import {CompanySearchComponent} from 'src/app/Search/company-search/company-search.component'
import { Meta, Title } from '@angular/platform-browser';

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
  constructor(public route: ActivatedRoute,public search:SearchService,
    public meta:Meta,public title:Title
    ) {
    // this.word = this.route.snapshot.paramMap.get('word');
    // this.page = this.route.snapshot.paramMap.get('page');
    this.route.params.subscribe(params=>{
      this.word=params.word;
      this.page=params.page;
      this.title.setTitle('search: '+this.word);
      
    })
   

  }

  ngOnInit() {
    // this.meta.updateTag({ property: 'og:description', content:  }); 
    // this.meta.updateTag({ property: 'og:url', content: window.location.href }); 
    // this.meta.updateTag({ property: 'og:image', content: JSON.parse(res['_body']).companyLogo }); 
    this.meta.updateTag({property:'og:title',content:'search'})
    this.title.setTitle('search: '+this.word);
   
  }

}
