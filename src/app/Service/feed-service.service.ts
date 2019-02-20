import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    token;
    tagId;
    productName;
    productImage;
    productDescription
    constructor(public http: Http) {}
    AddFeed(feed) {
      const headers = new Headers();
      headers.append('x-auth', this.token);
      console.log(this.token);
 console.log(feed)
         return this.http.post('http://localhost:8080/api/post',feed, {headers:headers})
        // return this.http.post('/post', formData, {headers: headers});
    }
    GetFeed(id) {
        const headers = new Headers();
        headers.append('x-auth', this.token);
        console.log(this.token);
        return this.http.get('http://localhost:8080/api/post/'+id,{headers:headers})
    }
    // Getpost(){
    //     const headers = new Headers();
    //     headers.append('x-auth', this.token);
    //     console.log(this.token);
    //     return this.http.get('/feed', {headers: headers})
    // }
    getCompanyFeed(){
        const headers = new Headers();
        headers.append('x-auth', this.token);
        console.log(this.token);
        return this.http.get('http://localhost:8080/api/feed',{headers:headers});
    }
}
