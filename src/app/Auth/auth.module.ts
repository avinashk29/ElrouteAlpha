import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthServiceService} from '../Auth/auth-service.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],

  providers: [AuthServiceService]
})
export class AuthModule { }
