import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService) { }
  panelOpenState = false;
  word;
  ngOnInit() {
    this.word = this.storage.get('query');
    this.search.onSearchCompany(this.word).subscribe(res => {
      console.log(res);
    });
  }

}
