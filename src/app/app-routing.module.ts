import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithoutLoginComponent } from './HomePage/without-login/without-login.component';
import { WithLoginComponent } from './HomePage/with-login/with-login.component';
import { SearchComponent } from './Search/search/search.component';
import { BookmarkComponent } from './Bookmark/bookmark/bookmark.component';
import { CompanySearchComponent } from './Search/company-search/company-search.component';
import { CompanyFormComponent } from './Company/company-form/company-form.component';
import { CompanyForm2Component } from './Company/company-form2/company-form2.component';
import { CompanyForm3Component } from './Company/company-form3/company-form3.component';
import { ProductFormComponent } from './Product/product-form/product-form.component';
 import { ProductPageComponent } from './Product/product-page/product-page.component';
 import { HeaderComponent } from './Header/header/header.component';
 import { SPageHeaderComponent } from './Header/s-page-header/s-page-header.component';
 import { SPageHeaderSearchComponent } from './Header/s-page-header-search/s-page-header-search.component';
import { FollowersComponent } from './User/followers/followers.component';
import { ServicePageComponent } from './serviceSection/service-page/service-page.component';
import { FollowingComponent } from './User/following/following.component';
import { FeedsComponent } from './Search/feeds/feeds.component';
import { CompanyComponent } from './Bookmark/company/company.component';
import { PostComponent } from './Bookmark/post/post.component';
import { BPageComponent } from './Bpage/b-page/b-page.component';

const routes: Routes = [
  {path: '' , component: WithoutLoginComponent},
  {path: 'Dashboard' , component: WithLoginComponent},
  {path: 'Result', component: SearchComponent},
  {path: 'bookmark', component: BookmarkComponent},
  {path: 'companyResults' , component: CompanySearchComponent},
  {path: 'B-page' , component: CompanyFormComponent},
  {path: 'B-page-step2' , component: CompanyForm2Component},
  {path: 'B-page-step3' , component: CompanyForm3Component},
  {path: 'productForm' , component: ProductFormComponent},
   {path: 'product-page' , component: ProductPageComponent},
   {path: 'header' , component: HeaderComponent},
   {path: 'with-login' , component: WithLoginComponent},
   {path: 'without-login' , component: WithoutLoginComponent },
   {path: 's-page-header' , component: SPageHeaderComponent},
   {path: 's-page-header-search' , component: SPageHeaderSearchComponent},
   {path: 'Followers', component: FollowersComponent },
   {path: 'servicePage', component: ServicePageComponent },
   {path: 'Following' , component: FollowingComponent},
   {path: 'feeds' , component: FeedsComponent},
   {path: 'companyBookmark' , component: CompanyComponent},
    {path: 'post' , component: PostComponent},
    {path: 'companyPage' , component: BPageComponent},
   
  // {path: 'feed ' , component: fee}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
