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
<<<<<<< HEAD
         return this.http.get('http://localhost:8080/api/follow/'+id,{headers:headers});
=======
         return this.http.get('http://www.elroute.co.in/api/follow/'+id,{headers:headers});
         
>>>>>>> 66f733fd370af11f9815feed3c0eb5c9bcfdae02
     }

    getFollowers(){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://www.elroute.co.in/api/followers',{headers:headers});

    }
    Unfollow(id){
        const headers=new Headers();
        headers.append('x-auth',this.token);
        return this.http.get('http://localhost:8080/api/unfollow'+id,{headers:headers});

    }

}
