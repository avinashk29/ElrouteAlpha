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
         return this.http.get('http://localhost:8080/api/follow/'+id,{headers:headers});
     }

    getFollowers(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
              return this.http.get('http://localhost:8080/api/followers',{headers:headers});

    }
    Unfollow(id){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:8080/api/unfollow/'+id,{headers:headers});

    }
    getFollowing(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:8080/api/user/following',{headers:headers});

    }

}