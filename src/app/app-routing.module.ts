import { NgModule } from '@angular/core';
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
const routes: Routes = [
  {path: '' , component: WithoutLoginComponent},
  {path: 'Dashboard' , component: WithLoginComponent, canActivate: [AuthGuardService]},
  {path: 'Result/:word/:page', component: SearchComponent},
  {path: 'bookmark', component: BookmarkComponent},
  {path: 'companyResults/:word/:page' , component: CompanySearchComponent},
  {path: 'B-page' , component: CompanyFormComponent, canActivate: [AuthGuardService] },
  {path: 'productForm' , component: ProductFormComponent, canActivate: [AuthGuardService , CompanyGuardService]},
   {path: 'product-page/:_id' , component: ProductPageComponent},
   {path: 'Followers', component: FollowersComponent , canActivate: [AuthGuardService]},
   {path: 'servicePage', component: ServicePageComponent },
   {path: 'Following' , component: FollowingComponent, canActivate: [AuthGuardService]},
   {path: 'feeds/:word/:page' , component: FeedsSearchComponent},
   {path: 'companyBookmark' , component: CompanyComponent},
    {path: 'post' , component: PostComponent},
    {path: 'companyPage/:id' , component: BPageComponent},
    {path:'editcompany/:id',component:CompanEditComponent},
    {path:'productEdit/:id',component:ProductComponent}

  // {path: 'feed ' , component: fee}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService,CompanyGuardService ],
})
export class AppRoutingModule { }
