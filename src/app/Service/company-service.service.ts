import { Injectable, Inject } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
// import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

 companyData;
 section;
 contact;
  companyFollowers=[];
  id;
  constructor(
    private http: Http,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService
    ) { }
  addCompany(company) {
    const headers = new Headers();
    headers.append('x-auth', this.storage.get('token'));
    return this.http.post('http://localhost:8080/api/company', company, {headers: headers});

  }
  GetCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.storage.get('token'));
    return this.http.get('http://localhost:8080/api/company', {headers: headers});
  }
  // GetoneCompany  method is using to get one company using company id
  token;
  GetoneCompany(id){
    this.token =this.storage.get('token');
    if(this.token){
    const headers = new Headers();
    headers.append('x-auth', this.token);
    return this.http.get('http://localhost:8080/api/company/'+ id,{headers:headers});
  }
    return this.http.get('http://localhost:8080/api/company/'+ id);
  }
  
  // updatCompany method is using to update data of company in database*/
  UpdateCompany(company){
    const headers = new Headers();
    headers.append('x-auth',this.storage.get('token'));
    return this.http.patch('http://localhost:8080/api/company' , company,  {headers: headers});
  }

  DeleteCompany(id){
    const headers=new Headers();
    headers.append('x-auth',this.storage.get('token'));
    return this.http.delete('http://localhost:8080/api/company', {headers:headers});

  }
companyFollowing(id){
  const headers = new Headers();
    headers.append('x-auth', this.storage.get('token'));
    return this.http.patch('http://localhost:8080/api/company/follow/'+id, {headers: headers});
}
getCompanyFollowers(){
  const headers = new Headers();
  headers.append('x-auth', this.storage.get('token'));
  return this.http.get('http://localhost:8080/api/company/followers',{headers: headers});

}
}
