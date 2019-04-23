import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithoutLoginComponent } from './HomePage/without-login/without-login.component';
import { WithLoginComponent } from './HomePage/with-login/with-login.component';
import { SearchComponent } from './Search/search/search.component';
import { BookmarkComponent } from './Bookmark/bookmark/bookmark.component';
import { CompanySearchComponent } from './Search/company-search/company-search.component';
import { CompanyFormComponent } from './Company/company-form/company-form.component';
import { ProductFormComponent } from './Product/product-form/product-form.component';
 import { ProductPageComponent } from './Product/product-page/product-page.component';
import { FollowersComponent } from './User/followers/followers.component';
import { ServicePageComponent } from './serviceSection/service-page/service-page.component';
import { FollowingComponent } from './User/following/following.component';
import { FeedsSearchComponent } from './Search/Searchfeeds/feeds.component';
import { CompanyComponent } from './Bookmark/company/company.component';
import { PostComponent } from './Bookmark/Bookmarkpost/post.component';
import { BPageComponent } from './Bpage/b-page/b-page.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {CompanyGuardService} from './guards/company-guard.service';
import { CompanEditComponent } from './Company/compan-edit/compan-edit.component';
import { ProductComponent } from './Product/product/product.component';
import { ProductListingComponent } from './Product/product-listing/product-listing.component';
import {CompanyForm2Component} from './Company/company-form2/company-form2.component';
import {CompanyForm3Component} from './Company/company-form3/company-form3.component';
import {CompanyForm4Component} from './Company/company-form4/company-form4.component';
import {CompanyForm5Component} from './Company/company-form5/company-form5.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
const routes: Routes = [
  {path: '' , component: WithoutLoginComponent},
  {path: 'Dashboard' , component: WithLoginComponent, canActivate: [AuthGuardService]},
  {path: 'product-results/:word/:page', component: SearchComponent},
  {path: 'bookmark', component: BookmarkComponent,canActivate: [AuthGuardService]},
  {path: 'bookmark/product', component: BookmarkComponent,canActivate: [AuthGuardService]},
  {path: 'company-results/:word/:page' , component: CompanySearchComponent},
  {path: 'B-page' , component: CompanyFormComponent},
  {path: 'productForm' , component: ProductFormComponent,canActivate: [AuthGuardService]},
   {path: 'product-page/:_id' , component: ProductPageComponent},
   {path: 'company/followers', component: FollowersComponent },
   {path: 'servicePage', component: ServicePageComponent },
   {path: 'following' , component: FollowingComponent, canActivate: [AuthGuardService]},
   {path: 'feed-results/:word/:page' , component: FeedsSearchComponent},
   {path: 'bookmark/company' , component: CompanyComponent,canActivate: [AuthGuardService]},
    {path: 'bookmark/feed' , component: PostComponent,canActivate: [AuthGuardService]},
    {path: 'companyPage/:id' , component: BPageComponent},
    {path: 'editcompany', component: CompanEditComponent,canActivate: [AuthGuardService]},
    {path: 'productEdit/:id', component: ProductComponent,canActivate: [AuthGuardService]},
    {path: 'company-edit/general' , component: CompanyForm2Component,canActivate: [AuthGuardService]},
    {path: 'company-edit/basic-details' , component: CompanyForm3Component,canActivate: [AuthGuardService]},
    {path: 'company-edit/market' , component: CompanyForm4Component,canActivate: [AuthGuardService]},
    {path: 'company-edit/contact' , component: CompanyForm5Component,canActivate: [AuthGuardService]},
    {path: 'product', component: ProductListingComponent,canActivate: [AuthGuardService]},
    {path:'request-password-reset', component:ForgetPasswordComponent},
    {path:'error-page', component:ErrorPageComponent},
   {path: '**' , redirectTo:'error-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService,CompanyGuardService ],
})
export class AppRoutingModule { }
