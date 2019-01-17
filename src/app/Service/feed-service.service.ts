import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    token;
    constructor(public http: Http) {}
    GetFeed(id) {
        const headers = new Headers();
        headers.append('x-auth', this.token);
        return this.http.get('http://www.elroute.co.in/api/feed/' + id, {headers: headers});
    }
}
