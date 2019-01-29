import { Injectable, Inject } from '@angular/core';
import { Http} from '@angular/http';
import {Router} from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
searchResult: [];
feedResult: [];
searchValue;
postBookmark
  constructor(public http: Http, public router: Router,@Inject(LOCAL_STORAGE) public storage:WebStorageService) { }
  onSearch(word , page) {
    console.log(word);
    return this.http.get('/search/' + word + '/' + page )
  }
  onSearchCompany(word) {
    return this.http.get('/searchCompany/'+ word);
     
  }
  onSearchFeed(word , page) {
    return this.http.get('/searchfeed/' + word + '/' + page);
  }
}
