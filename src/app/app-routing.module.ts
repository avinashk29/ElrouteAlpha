import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithoutLoginComponent } from './HomePage/without-login/without-login.component';
import { WithLoginComponent } from './HomePage/with-login/with-login.component';
import { SearchComponent } from './Search/search/search.component';
import { CompanySearchComponent } from './Search/company-search/company-search.component';
import { CompanyFormComponent } from './Company/company-form/company-form.component';
import { CompanyForm2Component } from './Company/company-form2/company-form2.component';
import { CompanyForm3Component } from './Company/company-form3/company-form3.component';

const routes: Routes = [
  {path: '' , component: WithoutLoginComponent},
  {path: 'Dashboard' , component: WithLoginComponent},
  {path: 'Result', component: SearchComponent},
  {path: 'companyResults' , component: CompanySearchComponent},
  {path: 'B-page' , component: CompanyFormComponent},
  {path: 'B-page-step2' , component: CompanyForm2Component},
  {path: 'B-page-step3' , component: CompanyForm3Component}
  // {path: 'feed' , component: fee}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
