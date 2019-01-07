import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
searchResult;
  constructor(public http: Http) { }
  onSearch(word) {
    console.log(word);
    return this.http.get('http://localhost:3000/search/' + word.word + '/' + word.page );

  }
  onSearchCompany(word) {
    return this.http.get('http://localhost:3000/searchCompany/' + word.word);
  }
  onSearchFeed(word) {
    return this.http.get('http://localhost:3000/searchfeed/' + word.word + '/' + word.page);
  }
}
