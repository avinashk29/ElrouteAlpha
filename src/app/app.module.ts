import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import {AuthModuleModule} from '../app/Auth/auth-module/auth-module.module';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent
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
