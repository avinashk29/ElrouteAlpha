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

    companyFormData.append('website', company.website);
    companyFormData.append('companyType', company.companyType);
    companyFormData.append('Image', company.Image);
    companyFormData.append('companySize', company.companySize);
    companyFormData.append('yearEstd', company.yearEstd);
    companyFormData.append('shortIntro', company.shortIntro);
      companyFormData.append('address', company.address);
      companyFormData.append('zipcode', company.zipCode);
      companyFormData.append('landline', company.landLine);
      companyFormData.append('mobile', company.mobile);

      headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.post('/company', companyFormData, {headers: headers});

  }
  GetCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('/company', {headers: headers});
  }
  // GetoneCompany  method is using to get one company using company id
  GetoneCompany(id) {
    console.log(id);
    return this.http.get('/company/' + id);
  }

  // updatCompany method is using to update data of company in database*/
  UpdateCompany(company) {
    const headers = new Headers();
    const companyFormData1 = new FormData();

        companyFormData1.append('companyName', company.companyName);
         companyFormData1.append('country', company.country);
         companyFormData1.append('city', company.city);
         companyFormData1.append('companyEmail', company.companyEmail);
         companyFormData1.append('industry', company.industry);
         companyFormData1.append('category' , company.category);

        companyFormData1.append('website', company.website);
        companyFormData1.append('companyType', company.companyType);
        companyFormData1.append('Image', company.Image);
         companyFormData1.append('companySize', company.companySize);
        companyFormData1.append('yearEstd', company.yearEstd );

          companyFormData1.append('address', company.address);
          companyFormData1.append('shortIntro', company.shortIntro);
          companyFormData1.append('zipCode', company.zipCode);
          companyFormData1.append('landline', company.landLine);
          companyFormData1.append('mobile', company.mobile);
          headers.append('x-auth', this.token);

    return this.http.patch('/company/update' , companyFormData1,  {headers: headers});
  }

  DeleteCompany(id){
    const headers=new Headers();
    headers.append('x-auth',this.token);
    return this.http.delete('/company/delete', {headers:headers});

  }
companyFollowing(id){
  const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('/company/follow/'+id, {headers: headers});
}
}
