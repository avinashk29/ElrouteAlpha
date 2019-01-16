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
  Id;
companyForm = new FormGroup({


});
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
   public companyService: CompanyServiceService, public router: Router) {
    this.Id = this.storage.get('companyId');
    console.log(this.Id);
    }

  ngOnInit() {
    this.companyService.token = this.storage.get('token');

  }

  onSubmit() {
    console.log(this.companyForm.value);
    const formData = this.companyForm.patchValue({
      address: (this.companyForm.value.address) ,
      city: (this.companyForm.value.city),
      zipCode: (this.companyForm.value.zipCode),
      landLine: (this.companyForm.value.landLine),
      mobile: (this.companyForm.value.mobile)
    });
    console.log(this.Id);
    this.router.navigate(['/companyPage']);
  }
}
