import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  companyForm = new FormGroup ({
   companyName: new FormControl(''),
   country: new FormControl(''),
   city: new FormControl(''),
   companyEmail: new FormControl(''),
   industry: new FormControl(''),
   category: new FormControl(''),
  });
  constructor(public router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.companyForm.value);
    this.router.navigate(['/B-page-step2']);
  }
}
