import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup , FormControl, Validators} from '@angular/forms';
import {CompanyServiceService} from '../../Service/company-service.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-company-form4',
  templateUrl: './company-form4.component.html',
  styleUrls: ['./company-form4.component.css']
})
export class CompanyForm4Component implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
  public companyService: CompanyServiceService, public router: Router,  public notification: ToastrService) { }
  companyId;
  companyForm = new FormGroup ({
    industry: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    mainProduct: new FormControl(''),
    specialities: new FormControl(''),
    mainMarket: new FormControl (''),
    hsCode: new FormControl(''),
    revenu: new  FormControl()
    }) ;
  ngOnInit() {
    this.companyService.token = this.storage.get('token');
    this.companyId = this.storage.get('companyId');
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      this.companyForm.patchValue({
        industry: JSON.parse(res['_body']).industry,
        category: JSON.parse(res['_body']).category,
        mainProduct: JSON.parse(res['_body']).mainProduct,
        specialities: JSON.parse(res['_body']).specialities,
        mainMarket: JSON.parse(res['_body']).mainMarket,
        hsCode: JSON.parse(res['_body']).hsCode,
        revenu: JSON.parse(res['_body']).revenu
      });
    });
  }
  onSubmit() {
    this.companyService.UpdateCompany(this.companyForm.value).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
    this.notification.success('B Face Updated');
  }

}
