import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    token;
    constructor(public http: Http) {}
    AddFeed(feed) {
      const headers = new Headers();
      headers.append('x-auth', this.token);
      console.log(this.token);
      const formData = new FormData();
         formData.append('Content', feed.Content);
         formData.append('Image' , feed.Image);
         return this.http.post('http://localhost:3000/post', formData, {headers: headers});
    }
    GetFeed(id) {
        const headers = new Headers();
        headers.append('x-auth', this.token);

        return this.http.get('http://localhost:3000/feed/' + id, {headers: headers});
    }
}
