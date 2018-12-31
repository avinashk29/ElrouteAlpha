import { Component, OnInit, Inject } from '@angular/core';
import {FormControl , FormGroup, Validator} from '@angular/forms';
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
 companyForm2 = new FormGroup({
  website: new FormControl(''),
  companyType: new FormControl(''),
  image: new FormControl(''),
  companySize: new FormControl(''),
  yearEstd: new FormControl('')
 });
  constructor(public companyService: CompanyServiceService, public router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.companyService.token = this.storage.get('token');
    this.token =  this.storage.get('token');
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
    console.log(this.token);
    this.companyService.addCompany(companyData).subscribe(res => {

      console.log(JSON.parse(res['_body']));
    });
    this.router.navigate(['/B-page-step3']);
  }
}
