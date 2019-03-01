import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";

@Injectable({
    providedIn:'root'
})

export class FollowService{
    token;
    followerId;
constructor(public http:Http){}
     addFollow(id){
         const headers=new Headers();
         headers.append('x-auth',this.token);
         return this.http.get('http://localhost:8080/api/user/follow/'+id,{headers:headers});
     }

    getFollowers(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
              return this.http.get('http://localhost:8080/api/company/followers',{headers:headers});

    }
    Unfollow(id){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:8080/api/user/unfollow/'+id,{headers:headers});

    }
    getFollowing(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:8080/api/user/following',{headers:headers});

    }

}
