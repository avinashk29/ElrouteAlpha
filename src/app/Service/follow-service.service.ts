import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn:'root'
})
export class FollowService{
token;
constructor(public http: Http){}
addFollow(id) {
const headers=new Headers();
headers.append('x-auth',this.token);
console.log(id);
return this.http.patch('http://localhost:3000/company/follow/' + id, id, {headers: headers});
}
}
