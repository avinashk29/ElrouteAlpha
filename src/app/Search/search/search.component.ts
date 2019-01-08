import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
show = false;
results = [];
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService) { }
  ngOnInit() {
    this.results = this.storage.get('searchResult');

  }

}
