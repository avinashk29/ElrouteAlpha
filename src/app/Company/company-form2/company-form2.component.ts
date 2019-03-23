import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import {imageValidator} from './image.validator';
import { CompanyServiceService } from '../../Service/company-service.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company-form2',
  templateUrl: './company-form2.component.html',
  styleUrls: ['./company-form2.component.css']
})
export class CompanyForm2Component implements OnInit {

  token;
  companyId;

  constructor(public companyService: CompanyServiceService, public router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, public notification: ToastrService) {
  }
  companyForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    companyEmail: new FormControl('', [Validators.required, Validators.email]),
    industry: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),

  });

  ngOnInit() {

    // this.companyService.token = this.storage.get('token');
    this.companyId = this.storage.get('companyId');
    this.token = this.storage.get('token');
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      this.companyForm.patchValue(JSON.parse(res['_body']));
    });

  }

  onSubmit() {
    this.companyService.UpdateCompany(this.companyForm.value).subscribe(res => {
      this.notification.success('B Face Updated');
    });



  }

}
