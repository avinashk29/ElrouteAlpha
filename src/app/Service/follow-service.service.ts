import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";


@Injectable({
    providedIn:'root'
})
export class FollowService{
    token;
constructor(public http:Http){}
     addFollow(id){
         const headers=new Headers();
         headers.append('x-auth',this.token);
         return this.http.get('http://localhost:3000/follow/'+id,{headers:headers});
         
     }

    getFollowers(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:3000/followers',{headers:headers});

    }
}
