import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
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

  token;
  companyId;

  constructor(public companyService: CompanyServiceService, public router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    }
    companyForm = new FormGroup ({
      companyName: new FormControl('', [Validators.required]),
       country: new FormControl('', [Validators.required]),
       city: new FormControl('', [Validators.required]),
       companyEmail: new FormControl('', [Validators.required, Validators.email]),
       industry: new FormControl('', [Validators.required]),
       category: new FormControl('', [Validators.required]),
      //  website: new FormControl(''),
      //  companyType: new FormControl(''),
      //  companySize: new FormControl(),
      //  yearEstd: new FormControl(),
      //  address: new FormControl(''),
      // // city: new FormControl(''),
      // shortIntro: new FormControl(''),
      // zipCode: new FormControl(),
      // landLine: new FormControl(),
      // mobile: new FormControl(),
      // Image: new FormControl()
      }) ;
    // companyForm2= this._fb.group({
    //   website: [''],
    //   companyType: [''],
    //   image: [''],
    //   companySize: [''],
    //   yearEstd: ['']
    //  });
  ngOnInit() {

    this.companyService.token = this.storage.get('token');
    this.companyId = this.storage.get('companyId');
    this.token =  this.storage.get('token');
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      // this.Image = JSON.parse(res['_body']).Image;
      // console.log(JSON.parse(res['_body']).Image)
      this.companyForm.patchValue({
        companyName: JSON.parse(res['_body']).companyName,
        country: JSON.parse(res['_body']).country,
        companyEmail: JSON.parse(res['_body']).companyEmail,
        city: JSON.parse(res['_body']).city,
        industry: JSON.parse(res['_body']).industry,
        category: JSON.parse(res['_body']).category,


      });
    });

  }
  // onImagePick(event: Event) {
  //  const file = (event.target as HTMLInputElement).files[0];
  //  this.companyForm2.patchValue({image: file});
  //  this.companyForm2.get('image').updateValueAndValidity();
  //    const reader = new FileReader();
  //    reader.onload = () => {
  //      this.imagePreview = reader.result;
  //    };
  //    reader.readAsDataURL(file);
  // }
  onSubmit() {

          this.companyService.UpdateCompany(this.companyForm.value).subscribe(res => {
             console.log(JSON.parse(res['_body']));
           });
      this.router.navigate(['/companyPage/' + this.companyId], {queryParams: {urltype : 'default'}});


  }

}
