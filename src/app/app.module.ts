import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { BookmarkComponent } from './Bookmark/bookmark/bookmark.component';
import { ProductBookmarkComponent } from './Bookmark/product/product.component';
import { PostComponent } from './Bookmark/Bookmarkpost/post.component';
import {PostsComponent} from './Post-feed/Post/posts/post.component';
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
import {FeedsComponent} from './Bookmark/feeds/feeds.component'
import { HeaderComponent } from './Header/header/header.component';
import { FooterComponent } from './StaticData/Footer/footer/footer.component';
import { HelpComponent } from './StaticData/Help/help/help.component';
import {MatCardModule} from '@angular/material/card';
import { WithoutLoginComponent } from './HomePage/without-login/without-login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import {TabHeaderComponent} from '../app/Header/tab-header/tab-header.component';
import {CompanySearchComponent } from '../app/Search/company-search/company-search.component';
import { CompanyForm2Component } from './Company/company-form2/company-form2.component';
import { CompanyForm3Component } from './Company/company-form3/company-form3.component';
import {SideNavComponent} from './Header/side-nav/side-nav.component';
import {ProductFormComponent} from './Product/product-form/product-form.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SPageHeaderComponent } from './Header/s-page-header/s-page-header.component';
import { SPageHeaderSearchComponent } from './Header/s-page-header-search/s-page-header-search.component';
import {FollowersComponent} from './User/followers/followers.component';
import {ServicePageComponent} from './serviceSection/service-page/service-page.component';
import { FollowingComponent } from './User/following/following.component';
import {Header3Component} from './Header/header3/header3.component';
import { FeedsSearchComponent } from './Search/Searchfeeds/feeds.component';
import {UserOverviewComponent} from './User/user-overview/user-overview.component';
// <--------------Material Design Imports------------------------>
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { WithLoginComponent } from './HomePage/with-login/with-login.component';
import {MatTabsModule} from '@angular/material/tabs';
// import { StickyNavModule } from 'ng2-sticky-nav';
// import { CarouselModule } from 'angular4-carousel';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { BPageComponent } from './Bpage/b-page/b-page.component';
// import {ProductBookmarkComponent} from './Bookmark/product/product.component';
import {CompanyServiceService} from './Service/company-service.service';
// import { CopmayService } from './Company/copmay.service';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {ProductServiceService } from './Service/product-service.service';
import { ToastrModule } from 'ngx-toastr';
import {AuthGuardService} from './guards/auth-guard.service';
import {CompanyGuardService} from './guards/company-guard.service';
import {BookmarkServices} from './Service/bookmark-services.service';
import {FeedService} from './Service/feed-service.service';
import {FollowService} from './Service/follow-service.service';
import {SearchService} from './Service/search.service';
import { ProductListingComponent } from './Product/product-listing/product-listing.component';
import { ProductComponent } from './Product/product/product.component';
import { CompanyForm4Component } from './Company/company-form4/company-form4.component';
import { CompanyForm5Component } from './Company/company-form5/company-form5.component';
import { EditSideNavComponent } from './Header/edit-side-nav/edit-side-nav.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {SocialLoginModule, AuthServiceConfig,GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider} from 'ng4-social-login';
import { OnefollowerComponent } from './User/onefollower/onefollower.component';
const config = new AuthServiceConfig([
{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('349477484566-r02ikt755q39t0gkg5lomu8cqag1as6n.apps.googleusercontent.com')
},
{
  id: FacebookLoginProvider.PROVIDER_ID,
  provider: new FacebookLoginProvider('307465413244657')
},
{
  id: LinkedinLoginProvider.PROVIDER_ID,
  provider: new LinkedinLoginProvider('81dtr1bi4w9s9g')
}
], false);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    BookmarkComponent,
    ProductBookmarkComponent,
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
    SPageHeaderComponent,
    SPageHeaderSearchComponent,
    FollowersComponent,
    ServicePageComponent,
    FollowingComponent,
    Header3Component,
   FeedsComponent,
    UserOverviewComponent,
    BPageComponent,
    PostsComponent,
    FeedsSearchComponent,
    ProductListingComponent,
    ProductComponent,
    CompanyForm4Component,
    CompanyForm5Component,
    EditSideNavComponent,
    LandingPageComponent,
    OnefollowerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    StorageServiceModule,
    MatExpansionModule,
    MatTabsModule,
    Ng2CarouselamosModule,
    SocialLoginModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MatCardModule,
    // StickyNavModule,
    ScrollDispatchModule,
    ToastrModule.forRoot()

  ],
  entryComponents: [
    SignupComponent,
    LoginComponent,
    EditComponent,
    FeedComponent,
    OnefollowerComponent
  ],
  providers: [CompanyServiceService, ProductServiceService, AuthGuardService, BookmarkServices , FeedService, FollowService,
     SearchService, CompanyGuardService,{ provide: AuthServiceConfig,useFactory: provideConfig}],
  bootstrap: [AppComponent],

})
export class AppModule { }
