import { Component, OnInit , Inject} from '@angular/core';
import {FormGroup , FormControl, FormArray, FormBuilder} from '@angular/forms';
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
  companyForm: FormGroup;
  links;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private _fb: FormBuilder,
   public companyService: CompanyServiceService, public router: Router, public notification: ToastrService) {
  }

  ngOnInit() {
    this.companyForm =  this._fb.group({
      website: [''],
      facebook: [''],
      companyType: [''],
      companySize: [''],
      yearEstd:[],
      city: [''],
      shortIntro: [''],
       links: this._fb.array([]),
      linkedin: [''],
      openAt:[''],
      closeAt:[''],
 
     }) ;

    // this.companyService.token = this.storage.get('token');
    this.companyId = this.storage.get('companyId');
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      this.companyForm.patchValue(JSON.parse(res['_body']));
      this.links = JSON.parse(res['_body']).links;
      console.log(this.links)
      this.setLink();
    });


  }

  onAddLink(){
    let control =  <FormArray>this.companyForm.controls.links;
    control.push(
      this._fb.group({
        linkName:['Instagram'],
        linkValue:['']
      })
    )
  }

  setLink(){
    let control =  <FormArray>this.companyForm.controls.links;
    this.links.forEach(x=>{
      control.push(this._fb.group({
        linkName:x.linkName,
        linkValue:x.linkValue
      }))
    })

  }

  deleteLink(index){
    let control =  <FormArray>this.companyForm.controls.links;
    control.removeAt(index)
  }
  onSubmit() {
    this.companyForm.value.website= this.companyForm.value.website.trim();
    this.companyService.UpdateCompany(this.companyForm.value).subscribe(res => {
      this.notification.success('B Face Updated');
    // console.log(JSON.parse(res['_body']));
    });

      // console.log(this.BForm.value.workingHours);
      const formData = new FormData();
      formData.append('openAt', this.companyForm.value.openAt );
      formData.append('closeAt', this.companyForm.value.closeAt );
      this.companyService.UpdateCompany(formData).subscribe(res => {
        this.companyService.companyData.openAt = JSON.parse(
          res['_body']
        ).openAt;
        this.companyService.companyData.closeAt = JSON.parse(
          res['_body']
        ).closeAt;




   

      });

  }
}
