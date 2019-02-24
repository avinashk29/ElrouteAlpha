import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  token;
  CompanyName;
  category;
  city;
  companyEmail;
  country;
  industry;
  shortIntro;
  website;
  workingHours;
  yearEstd;
  companyType;
  address;
  companySize;
  Image;
  companyLogo;
  infoImage;
  section;
  certification;
  companyImage;
  companyFollowers;
   socialLink;
  Id;
  constructor(private http: Http) { }
  addCompany(company) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.post('http://localhost:8080/api/company', company, {headers: headers});

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
    return this.http.patch('http://localhost:8080/api/company' , company,  {headers: headers});
  }

  DeleteCompany(id){
    const headers=new Headers();
    headers.append('x-auth',this.token);
    return this.http.delete('http://localhost:8080/api/company', {headers:headers});

  }
companyFollowing(id){
  const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.patch('http://localhost:8080/api/company/follow/'+id, {headers: headers});
}
getCompanyFollowers(){
  const headers = new Headers();
  headers.append('x-auth', this.token);
  return this.http.get('http://localhost:8080/api/company/followers',{headers: headers});

}
}
