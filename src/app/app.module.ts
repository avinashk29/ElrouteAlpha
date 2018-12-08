import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import {AuthModuleModule} from '../app/Auth/auth-module/auth-module.module';
import { BookmarkComponent } from './Bookmark/bookmark/bookmark.component';
import { ProductComponent } from './Bookmark/product/product.component';
import { PostComponent } from './Bookmark/post/post.component';
import { CompanyComponent } from './Bookmark/company/company.component';
import { CompanyFormComponent } from './Company/company-form/company-form.component';
import { CompanProfileComponent } from './Company/compan-profile/compan-profile.component';
import { CompanEditComponent } from './Company/compan-edit/compan-edit.component';
import { HomepageComponent } from './HomePage/homepage/homepage.component';
import { ProductPageComponent } from './Product/product-page/product-page.component';
import { ProfileComponent } from './User/Profilr/profile/profile.component';
import { EditComponent } from './User/Edit/edit/edit.component';
import { SearchComponent } from './Search/search/search.component';
import { EditPostComponent } from './PostAndFeed/edit_Post/edit-post/edit-post.component';
import { FeedComponent } from './PostAndFeed/Feed/feed/feed.component';
import { HeaderComponent } from './Header/header/header.component';
import { FooterComponent } from './StaticData/Footer/footer/footer.component';
import { HelpComponent } from './StaticData/Help/help/help.component';

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
    HomepageComponent,
    ProductPageComponent,
    ProfileComponent,
    EditComponent,
    SearchComponent,
    EditPostComponent,
    FeedComponent,
    HeaderComponent,
    FooterComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
