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
         contactDevision: this._fb.array([this.addDevision()])
    });
    this.companyService.token = this.storage.get('token');
    this.companyId = this.storage.get('companyId');
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      this.companyForm.patchValue({
        address: JSON.parse(res['_body']).address,
        city: JSON.parse(res['_body']).city,
        zipCode: JSON.parse(res['_body']).zipCode,
        landLine: JSON.parse(res['_body']).landLine,
        mobile: JSON.parse(res['_body']).mobile,


      });
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
    this.companyService.UpdateCompany(this.companyForm.value).subscribe(res => {
    });
    this.notification.success('B Face Updated');
  }
}
