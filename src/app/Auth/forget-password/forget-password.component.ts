import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgetpasswordService } from 'src/app/Service/forgetpassword.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  requestPasswordForm=new FormGroup({
    email:new FormControl('',Validators.required)
  })

  restPassword=new FormGroup({
    otp:new FormControl('',Validators.required),
    newPassword:new FormControl('',Validators.required),
    confirmNewPassword:new FormControl('',Validators.required),
  })
  otp=true;
  change=false;

  constructor(private forgetpasswordService:ForgetpasswordService) { }

  ngOnInit() {
  }

  requestOtp(){
    this.otp=false;
    this.change=true;
    this.forgetpasswordService.forgetPassword(this.requestPasswordForm.value).subscribe(res=>{
      console.log(res);
    })


  }
  changePassword(){
    console.log(this.requestPasswordForm.value)
    const fdata=new FormData();
    fdata.append('forgetpassword',this.restPassword.value.newPassword);
    fdata.append('Otp',this.restPassword.value.opt);
    this.forgetpasswordService.resetPassword(this.requestPasswordForm.value.email,fdata).subscribe(res=>{
      console.log(res)
    })
  }

}
  