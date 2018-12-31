import { Component, OnInit , Inject} from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms';
import {CompanyServiceService} from '../../Service/company-service.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-company-form3',
  templateUrl: './company-form3.component.html',
  styleUrls: ['./company-form3.component.css']
})
export class CompanyForm3Component implements OnInit {
companyForm = new FormGroup({
  address: new FormControl(''),
  city: new FormControl(''),
  zipCode: new FormControl(''),
  landLine: new FormControl(''),
  mobile: new FormControl('')
});
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
   public companyService: CompanyServiceService, public router: Router) { }

  ngOnInit() {
    this.companyService.token = this.storage.get('token');
  }

  onSubmit() {
    console.log(this.companyForm.value);
    const formData = this.companyForm.value;
    this.companyService.addCompany(formData).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
    this.router.navigate(['/companyPage']);
  }
}
