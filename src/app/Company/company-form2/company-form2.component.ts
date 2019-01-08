import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder,FormControl,FormGroup} from '@angular/forms';
// import {imageValidator} from './image.validator';
import {CompanyServiceService} from '../../Service/company-service.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-company-form2',
  templateUrl: './company-form2.component.html',
  styleUrls: ['./company-form2.component.css']
})
export class CompanyForm2Component implements OnInit {

  imagePreview;
  token;
 Id;
 
  constructor(public companyService: CompanyServiceService, public router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService , public _fb: FormBuilder) { }
    companyForm2 = new FormGroup({
      website: new FormControl(''),
      companyType: new FormControl(''),
      image: new FormControl(''),
      companySize: new FormControl(''),
      yearEstd: new FormControl('')
      
    });
    // companyForm2= this._fb.group({
    //   website: [''],
    //   companyType: [''],
    //   image: [''],
    //   companySize: [''],
    //   yearEstd: ['']
    //  });
  ngOnInit() {
    this.companyService.token = this.storage.get('token');
    this.token =  this.storage.get('token');
    this.Id = this.storage.get('companyId');
    console.log(this.Id);
  }
  onImagePick(event: Event) {
   const file = (event.target as HTMLInputElement).files[0];
   this.companyForm2.patchValue({image: file});
   this.companyForm2.get('image').updateValueAndValidity();
     const reader = new FileReader();
     reader.onload = () => {
       this.imagePreview = reader.result;
     };
     reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log(this.companyForm2.value);
    const companyData = this.companyForm2.value;
    console.log(companyData.value);
    // this.companyForm2.patchValue({
    //   website: [companyData.website],
    //   companyType: [companyData.companyType],
    //   image: [companyData.image],
    //   companySize: [companyData.companySize],
    //   yearEstd: [companyData.yearEstd]
    //  });
    //  const companyData2 = this.companyForm2.value;
    //  console.log(companyData2);
      this.companyService.addCompany2(companyData,this.Id).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
    console.log(this.Id)
    this.router.navigate(['/B-page-step3']);
  }
}
