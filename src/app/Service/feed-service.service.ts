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
         return this.http.post('http://localhost:8080/api/post',formData, {headers:headers})
        // return this.http.post('/post', formData, {headers: headers});
    }
    GetFeed() {
        const headers = new Headers();
        headers.append('x-auth', this.token);
        console.log(this.token);
        return this.http.get('http://localhost:8080/api/post',{headers:headers})
    }
    // Getpost(){
    //     const headers = new Headers();
    //     headers.append('x-auth', this.token);
    //     console.log(this.token);
    //     return this.http.get('/feed', {headers: headers})
    // }
}
