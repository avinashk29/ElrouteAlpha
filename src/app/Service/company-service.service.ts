import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  token;
  companyName;
  Id;
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
const companyFormData = new FormData();

    companyFormData.append('companyName', company.companyName);
    companyFormData.append('country', company.country);
    companyFormData.append('city', company.city);
    companyFormData.append('companyEmail', company.companyEmail);
    companyFormData.append('industry', company.industry);
    companyFormData.append('category' , company.category);

    companyFormData.append('website', company.website);
    companyFormData.append('companyType', company.companyType);
    companyFormData.append('image', company.image);
    companyFormData.append('companySize', company.companySize);
    companyFormData.append('yearEstd', company.yearEstd);

      companyFormData.append('address', company.address);
      companyFormData.append('city', company.city);
      companyFormData.append('zipcode', company.zipCode);
      companyFormData.append('landline', company.landLine);
      companyFormData.append('mobile', company.mobile);
      headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.post('http://localhost:3000/company', companyFormData, {headers: headers});

  }
// addCompany3(company){
//   const headers=new Headers();
//   headers.append('x-auth',this.token);
//   const companyFormData=new FormData();
//   companyFormData.append('address',company.address);
//       companyFormData.append('city',company.city);
//       companyFormData.append('zipcode',company.zipCode);
//       companyFormData.append('landline',company.landLine);
//       companyFormData.append('mobile',company.mobile);
//       // headers.append('x-auth', this.token);
//       return this.http.patch('http://localhost:3000/company/update/' ,companyFormData , {headers: headers});
// }
  // showComapny(){
  //   const headers=new Headers();
  //   headers.append('x-auth',this.token);
  //   return this.http.get('http://localhost:3000/company',{headers: headers});
  // }

  // OneditCompany(company,id) {
  //   const headers = new Headers();
  //   headers.append('x-auth', this.token);
  //   return this.http.patch('http://localhost:3000/company/update/' + id, company, {headers: headers});
  // }
  GetCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:3000/company', {headers: headers});
  }
  GetoneCompany(id) {
    console.log(id);
    return this.http.get('http://localhost:3000/company/'+id, id);
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

companyFollowing(id){
  const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('http://localhost:3000/company/follow/'+id, {headers: headers});
}
}
