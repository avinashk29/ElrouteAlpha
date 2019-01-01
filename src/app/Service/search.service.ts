import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public http: Http) { }
  onSearch(word) {
    console.log(word);
    return this.http.get('http://localhost:3000/search/' + word.word + '/' + word.page );

  }
}
