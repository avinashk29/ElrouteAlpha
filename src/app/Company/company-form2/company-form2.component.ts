import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup, Validator} from '@angular/forms';
// import {imageValidator} from './image.validator';
@Component({
  selector: 'app-company-form2',
  templateUrl: './company-form2.component.html',
  styleUrls: ['./company-form2.component.css']
})
export class CompanyForm2Component implements OnInit {
  imagePreview;
 companyForm2 = new FormGroup({
  website: new FormControl(''),
  companyType: new FormControl(''),
  image: new FormControl(''),
  companySize: new FormControl(''),
  yearEstd: new FormControl('')
 });
  constructor() { }

  ngOnInit() {
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
    console.log(this.companyForm2.value.image.name) ;
  }
}
