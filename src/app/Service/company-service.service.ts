import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  token;
  companyName;
  Id;
  constructor(private http: Http) { }
  // signup(user) {
  //  return this.http.post('/auth/signup', user);
  // }
  // login(user) {
  //   return this.http.post('/auth/login', user);
  // }
  // onEditUser(user) {
  // const headers = new Headers();
  // headers.append('x-auth', this.token);
  //   return this.http.patch('/user/update', user, {headers: headers});
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

    // companyFormData.append('website', company.website);
    // companyFormData.append('companyType', company.companyType);
    // companyFormData.append('Image', company.Image);
    // companyFormData.append('companySize', company.companySize);
    // companyFormData.append('yearEstd', company.yearEstd);
    // companyFormData.append('shortIntro', company.shortIntro);
    //   companyFormData.append('address', company.address);
    //   companyFormData.append('zipcode', company.zipCode);
    //   companyFormData.append('landline', company.landLine);
    //   companyFormData.append('mobile', company.mobile);

      headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.post('http://localhost:8080/api/company', companyFormData, {headers: headers});

  }
  GetCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:8080/api/company', {headers: headers});
  }
  // GetoneCompany  method is using to get one company using company id
  GetoneCompany(id) {
    // console.log(id);
    return this.http.get('http://localhost:8080/api/company/' + id);
  }

  // updatCompany method is using to update data of company in database*/
  UpdateCompany(company) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
     console.log(this.token);
    return this.http.patch('http://localhost:8080/api/company/update' , company,  {headers: headers});
  }

  DeleteCompany(id){
    const headers=new Headers();
    headers.append('x-auth',this.token);
    return this.http.delete('http://localhost:8080/api/company/delete', {headers:headers});

  }
companyFollowing(id){
  const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('http://localhost:8080/api/company/follow/'+id, {headers: headers});
}
}
