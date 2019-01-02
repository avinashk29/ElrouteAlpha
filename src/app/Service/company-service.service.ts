import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
// import {User } from '../models/user';
// import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  token;
  companyName;
//  user: User =
//    {
//      _id: '',
//     UserName: '',
//     Email: '',
//     Password: ''
//    };
//    company: Company = {
//     category: '',
//     companyName: '',
//     location: '',
//     website: '',
//     shortIntro: '',
//     yearEst: 0 ,
//     address: '',
//     employeeSize: 0,
//     about: '',
//    };

  constructor(private http: Http) { }
  // signup(user) {
  //  return this.http.post('http://localhost:3000/auth/signup', user);
  // }
  // login(user) {
  //   return this.http.post('http://localhost:3000/auth/login', user);
  // }
  // onEditUser(user) {
  // const headers = new Headers();
  // headers.append('x-auth', this.token);
  //   return this.http.patch('http://localhost:3000/user/update', user, {headers: headers});
  // }
  addCompany(company) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.post('http://localhost:3000/company', company, {headers: headers});

  }

  // showComapny(){
  //   const headers=new Headers();
  //   headers.append('x-auth',this.token);
  //   return this.http.get('http://localhost:3000/company',{headers: headers});
  // }

  OneditCompany(company,id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('http://localhost:3000/company/update/' + id, company, {headers: headers});
  }
  GetCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:3000/company', {headers: headers});
  }
//   searchResult(query){
//     return this.http.get('http://localhost:3000/search/'+query);
//   }

//   addFeed(post){
//     const headers=new Headers();
//     headers.append('x-auth',this.token);
//     return this.http.post('http://localhost:3000/post',post,{headers:headers});
//   }

//   getFeed(){
//     const headers=new Headers();
//     headers.append('x-auth',this.token);
//     return this.http.get('http://localhost:3000/post', {headers: headers});
//   }
//   onEditPost(post,id){
//     const headers=new Headers();
//     headers.append('x-auth',this.token);
//     return this.http.patch('http://localhost:3000/post/update/'+id,post, {headers: headers});
//   }
//   Followers(companyName){
//     const headers=new Headers();
//     headers.append('x-auth',this.token);
//     return this.http.patch('http://localhost:3000/company/follow',companyName, {headers: headers});
//   }
//   showFollowers(){
//     const headers=new Headers();
//     headers.append('x-auth',this.token);
//     return this.http.get('http://localhost:3000/user/followers', {headers: headers});
//   }
//   GetServices(type){
//     const headers=new Headers();
//     headers.append('x-auth',this.token);
//     return this.http.get('http://localhost:3000/service/'+type, {headers: headers});

//   }
//   GetProduct(){
//     const headers=new Headers();
//     headers.append('x-auth',this.token);
//     return this.http.get('http://localhost:3000/product', {headers: headers});
//   }
//   bookMark(id) {
//     const headers = new Headers();
//     headers.append('x-auth', this.token);
//     return this.http.patch('http://localhost:3000/bookmark/product/'+id, {headers: headers});
//   }

// download() {
//   const headers = new Headers();
//   headers.append('x-auth', this.token);

//   return this.http.get('http://localhost:3000/bookmarksave', {headers: headers});
// }
}