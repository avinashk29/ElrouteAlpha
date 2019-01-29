import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";

@Injectable({
    providedIn:'root'
})
export class PostService{
    token;
    constructor(private http:Http){}
    addPost(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.post('/post',{headers:headers});
    }
    getPost(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('/post',{headers:headers});
    }
    updatePost(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.patch('/post',{headers:headers});
    }
    deletePost(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.delete('/post',{headers:headers});
    }
}