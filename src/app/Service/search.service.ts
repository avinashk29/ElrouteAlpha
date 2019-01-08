import { Injectable, Inject } from '@angular/core';
import { Http} from '@angular/http';
import  {Router} from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
searchResult: [];
searchValue;
  constructor(public http: Http, public router: Router,@Inject(LOCAL_STORAGE) public storage:WebStorageService) { }
  onSearch(word) {
    console.log(word);
    return this.http.get('http://localhost:3000/search/' + word.word + '/' + word.page ).subscribe(res =>{
      //this.storage.get('query');
      console.log(JSON.parse(res['_body']));
      this.searchResult = JSON.parse(res['_body']);
    });

  }
  onSearchCompany(word) {
    return this.http.get('http://localhost:3000/searchCompany/' + word.word);
  }
  onSearchFeed(word) {
    return this.http.get('http://localhost:3000/searchfeed/' + word.word + '/' + word.page);
  }
}
