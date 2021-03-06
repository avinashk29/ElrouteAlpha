import { Component, OnInit , Inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CompanyServiceService} from '../../Service/company-service.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-company-form5',
  templateUrl: './company-form5.component.html',
  styleUrls: ['./company-form5.component.css']
})
export class CompanyForm5Component implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
  public companyService: CompanyServiceService, public router: Router,  private _fb: FormBuilder,  public notification: ToastrService) { }
companyId;
contactDevisionForm: FormGroup;
companyForm: FormGroup;
  ngOnInit() {
    this.companyForm =  this._fb.group({
          address: [''],
          city: [''],
          zipCode: [ ],
          landLine: [ ],
          mobile: [],
          countryCode:['+91'],
          cityCode:['141'],
          mobileCountryCode:['+91'],
          contactDevision: this._fb.array([this.addDevision()])
    });
    this.companyId = this.storage.get('companyId');
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      this.companyForm.patchValue(JSON.parse(res['_body']));
    });
  }
  addDevision() {
    return this._fb.group({
      DevisionName: [''],
      DevisionEmail: ['']
    });
  }
  get divisionArray() {
    return <FormArray>this.companyForm.get('contactDevision');
  }
  onSubmit() {
    // this.companyForm.value.landLine='+91141'+this.companyForm.value.landLine;
    this.notification.success('B Face Updated');
    this.companyService.UpdateCompany(this.companyForm.value).subscribe(res => {

    });

  }
}
