import { Component, OnInit , Inject} from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms';
import {CompanyServiceService} from '../../Service/company-service.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-company-form3',
  templateUrl: './company-form3.component.html',
  styleUrls: ['./company-form3.component.css']
})
export class CompanyForm3Component implements OnInit {
  companyId;
  companyForm = new FormGroup ({
     website: new FormControl(''),
     facebook: new FormControl(''),
     companyType: new FormControl(''),
     companySize: new FormControl(),
     yearEstd: new FormControl(),
   city: new FormControl(''),
     shortIntro: new FormControl(''),
     workingHours:new FormControl('')
  
    }) ;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
   public companyService: CompanyServiceService, public router: Router, public notification: ToastrService) {
  }

  ngOnInit() {
    // this.companyService.token = this.storage.get('token');
    this.companyId = this.storage.get('companyId');
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      console.log(JSON.parse(res['_body']))
      this.companyForm.patchValue({
        website: JSON.parse(res['_body']).website,
        companyType: JSON.parse(res['_body']).companyType,
        companySize: JSON.parse(res['_body']).companySize,
        yearEstd: JSON.parse(res['_body']).yearEstd,
        shortIntro: JSON.parse(res['_body']).shortIntro,
        city: JSON.parse(res['_body']).city,
        workingHours: JSON.parse(res['_body']).workingHours,
        facebook:  JSON.parse(res['_body']).facebook
      });
    });


  }

  onSubmit() {
    console.log(this.companyForm.value);
    this.companyService.UpdateCompany(this.companyForm.value).subscribe(res => {
      console.log(res);
    });
    this.notification.success('B Face Updated');
  }
}
