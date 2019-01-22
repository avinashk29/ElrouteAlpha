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
  //  return this.http.post('http://www.elroute.co.in/api/auth/signup', user);
  // }
  // login(user) {
  //   return this.http.post('http://www.elroute.co.in/api/auth/login', user);
  // }
  // onEditUser(user) {
  // const headers = new Headers();
  // headers.append('x-auth', this.token);
  //   return this.http.patch('http://www.elroute.co.in/api/user/update', user, {headers: headers});
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
    return this.http.post('http://www.elroute.co.in/api/company', companyFormData, {headers: headers});

  }
  GetCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://www.elroute.co.in/api/company', {headers: headers});
  }
  //GetoneCompany  method is using to get one company using company id
  GetoneCompany(id) {
    console.log(id);
    return this.http.get('http://www.elroute.co.in/api/company/'+id, id);
  }

  //updatCompany method is using to update data of company in database*/
  UpdateCompany(id,company){
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
    return this.http.patch('http://www.elroute.co.in/api/company/update/'+id,company,{headers:headers})
  }

  DeleteCompany(id){
    const headers=new Headers();
    headers.append('x-auth',this.token);
    return this.http.delete('http://www.elroute.co.in/api/company/delete/'+id, {headers:headers});

  }
companyFollowing(id){
  const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('http://www.elroute.co.in/api/company/follow/'+id, {headers: headers});
}
}
