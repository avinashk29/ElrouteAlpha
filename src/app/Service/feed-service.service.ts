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
    productDescription;
    constructor(public http: Http) {}
    AddFeed(feed) {
      const headers = new Headers();
      headers.append('x-auth', this.token);
         return this.http.post('http://localhost:8080/api/post',feed, {headers:headers})
    }
    GetFeed() {
        const headers = new Headers();
        headers.append('x-auth', this.token);
        return this.http.get('http://localhost:8080/api/post',{headers:headers})
    }

    getCompanyFeed(){
        const headers = new Headers();
        headers.append('x-auth', this.token);
        return this.http.get('http://localhost:8080/api/feed',{headers:headers});
    }
    getFeedById(id){
    
        return this.http.get('http://localhost:8080/api/post/'+id);
    }
        deletePost(id){
        const headers = new Headers();
        headers.append('x-auth',this.token);
        return this.http.delete('http://localhost:8080/api/post/' + id, {headers:headers});
    }
}
