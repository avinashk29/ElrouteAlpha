import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { BookmarkComponent } from './Bookmark/bookmark/bookmark.component';
import { ProductComponent } from './Bookmark/product/product.component';
import { PostComponent } from './Bookmark/post/post.component';
import { CompanyComponent } from './Bookmark/company/company.component';
import { CompanyFormComponent } from './Company/company-form/company-form.component';
import { CompanProfileComponent } from './Company/compan-profile/compan-profile.component';
import { CompanEditComponent } from './Company/compan-edit/compan-edit.component';
import { ProductPageComponent } from './Product/product-page/product-page.component';
import { ProfileComponent } from './User/Profile/profile.component';
import { EditComponent } from './User/Edit/edit.component';
import { SearchComponent } from './Search/search/search.component';
import { EditPostComponent } from './Post-feed/edit_Post/edit-post/edit-post.component';
import { FeedComponent } from './Post-feed/Feed/feed/feed.component';
import { HeaderComponent } from './Header/header/header.component';
import { FooterComponent } from './StaticData/Footer/footer/footer.component';
import { HelpComponent } from './StaticData/Help/help/help.component';
import { AuthModule } from './Auth/auth.module';
import { WithoutLoginComponent } from './HomePage/without-login/without-login.component';
import {HomepageModule} from '../app/HomePage/homepage.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import {TabHeaderComponent} from '../app/Header/tab-header/tab-header.component';
import {CompanySearchComponent } from '../app/Search/company-search/company-search.component';
import { CompanyForm2Component } from './Company/company-form2/company-form2.component';
import { CompanyForm3Component } from './Company/company-form3/company-form3.component';
import {SideNavComponent} from './Header/side-nav/side-nav.component';
import {ProductFormComponent} from './Product/product-form/product-form.component';
import { ServicePageComponent } from './serviceSection/service-page/service-page.component';
import {ProductListingComponent} from './Product/product-listing/product-listing.component';
// <--------------Material Design Imports------------------------>
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { WithLoginComponent } from './HomePage/with-login/with-login.component';
import {MatExpansionModule} from '@angular/material/expansion';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    BookmarkComponent,
    ProductComponent,
    PostComponent,
    CompanyComponent,
    CompanyFormComponent,
    CompanProfileComponent,
    CompanEditComponent,
    ProductPageComponent,
    ProfileComponent,
    EditComponent,
    SearchComponent,
    EditPostComponent,
    FeedComponent,
    HeaderComponent,
    FooterComponent,
    HelpComponent,
    WithoutLoginComponent,
    WithLoginComponent,
    TabHeaderComponent,
    CompanySearchComponent,
    CompanyForm2Component,
    CompanyForm3Component,
    SideNavComponent,
    ProductFormComponent,
    ServicePageComponent,
    ProductListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomepageModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpModule,
    StorageServiceModule,
    MatExpansionModule

  ],
  entryComponents: [
    SignupComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
