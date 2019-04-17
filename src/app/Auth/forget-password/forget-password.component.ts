import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgetpasswordService } from 'src/app/Service/forgetpassword.service';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
first;
last;
correct;
correct2=true;
passwordChange=false;
otpIncorrect=false;
errorEmail=false;
correctEmail=false;

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

  constructor(private forgetpasswordService:ForgetpasswordService,private router:Router,
    public dialogRef: MatDialogRef<ForgetPasswordComponent>, private notification:ToastrService) { 
  
    }

  ngOnInit() {
  
  }
  
  matchPassword(newPassword,confirmNewPassword){
    console.log(newPassword);
    console.log(confirmNewPassword)
    if(newPassword===confirmNewPassword){
      console.log('done');
      this.correct=true;
      this.passwordChange=false;
    }else{
      console.log('error')
      this.correct2=true;
      this.passwordChange=true;
      this.correct=false;
    }
   
  }
close(){
this.dialogRef.close();
}
  requestOtp(){
    this.forgetpasswordService.forgetPassword(this.requestPasswordForm.value).subscribe(res=>{
      if(res){
        this.change=true;
        this.otp=false;
      }
    },err=>{
      this.errorEmail=true;
      this.otp=true;
    })


  }
  changePassword(){  
    const fdata=new FormData();
    fdata.append('password',this.restPassword.value.newPassword);
    fdata.append('otp',this.restPassword.value.otp);
    this.forgetpasswordService.resetPassword(this.requestPasswordForm.value.email,fdata).subscribe(res=>{
      this.dialogRef.close();
      this.notification.success('Password Updated!');
    },err=>{
    this.otpIncorrect=true;
    });
   

  }
}
  