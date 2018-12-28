import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl} from '@angular/forms';

@Component({
  selector: 'app-company-form3',
  templateUrl: './company-form3.component.html',
  styleUrls: ['./company-form3.component.css']
})
export class CompanyForm3Component implements OnInit {
companyForm = new FormGroup({
  address: new FormControl(''),
  city: new FormControl(''),
  zipCode: new FormControl(''),
  landLine: new FormControl(''),
  mobile: new FormControl('')
});
  constructor() { }

  ngOnInit() {
  }
onSubmit(){
  console.log(this.companyForm.value);
}
}
