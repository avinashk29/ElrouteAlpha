import { Component, OnInit  , Inject, Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import { AuthServiceService } from 'src/app/Auth/auth-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  token;
  companyForm = new FormGroup ({
   companyName: new FormControl(''),
   country: new FormControl(''),
   city: new FormControl(''),
   companyEmail: new FormControl(''),
   industry: new FormControl(''),
   category: new FormControl(''),
  }); 
  submitted: boolean
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
  public router: Router, public companyService: CompanyServiceService , public authService: AuthServiceService) { }

  ngOnInit() {
    this.companyService.token = this.storage.get('token');
    this.token =  this.storage.get('token');
  }


  onSubmit() {
    console.log(this.companyForm.value);
    const companyData = this.companyForm.value;
    console.log(this.token);
    // this.storage.set('companyName',companyData.companyName);
    // this.storage.set('country',companyData.country);
    // this.storage.set('city',companyData.city);
    // this.storage.set('companyEmail',companyData.companyEmail);
    // this.storage.set('industry',companyData.industry);
    // this.storage.set('category',companyData.category);
        this.companyService.addCompany(companyData).subscribe(res => {
      console.log(JSON.parse(res['_body'])._id);
      this.storage.set('companyId' , JSON.parse(res['_body'])._id);
    });
    this.router.navigate(['/B-page-step2']);
  }
}
