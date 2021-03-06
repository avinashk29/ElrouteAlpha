import { Injectable, Inject } from '@angular/core';
import { Http, Headers} from '@angular/http';
import {Router} from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
searchResult: [];
feedResult: [];
searchValue;
postBookmark;
presult;
fresult;
 data={};
 token;
 feedResultLength;
 productResultLength;
 companyResultLength;
  constructor(public http: Http, public router: Router,@Inject(LOCAL_STORAGE) public storage:WebStorageService) { }



  setOption(value) {
     this.data = value;
     this.fresult=value
   }
   getOption() {
     return this.data;
   }
  onSearch(word , page) {
    if(this.token){
      const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:8080/api/search/' + word + '/' + page, {headers:headers});}
    return this.http.get('http://localhost:8080/api/search/' + word + '/' + page);
  }
  onSearchCompany(word) {
    if(this.token){
      const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:8080/api/searchCompany/' + word + '/1',{headers:headers});}
    return this.http.get('http://localhost:8080/api/searchCompany/' + word + '/1');

  }
  onSearchFeed(word , page) {
    if(this.token){
      const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:8080/api/searchfeed/' + word + '/' + page,{headers:headers});
    }
    return this.http.get('http://localhost:8080/api/searchfeed/' + word + '/' + page);
  }
  maxResult(word){
  // console.log(word)
    return this.http.get('http://localhost:8080/api/searchMax/' + word );
  }

}
