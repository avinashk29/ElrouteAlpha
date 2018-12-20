import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyForm2Component } from '../Company/company-form2/company-form2.component';
import { CompanyForm3Component } from '../Company/company-form3/company-form3.component';

@NgModule({
  declarations: [CompanyForm2Component, CompanyForm3Component],
  imports: [
    CommonModule
  ]
})
export class CompanyModule { }
