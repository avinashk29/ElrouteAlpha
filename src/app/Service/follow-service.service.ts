import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";


@Injectable({
    providedIn:'root'
})
export class FowllowService{
    token;
constructor(public http:Http){}
     addFollow(id){
         const headers=new Headers();
         headers.append('x-auth',this.token);
         return this.http.patch('http://localhost:3000/company/follow/'+id,id, {headers:headers})
     }
}
