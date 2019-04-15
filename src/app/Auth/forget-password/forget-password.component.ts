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
    public dialogRef: MatDialogRef<ForgetPasswordComponent>, private notification:ToastrService) { }

  ngOnInit() {
  }
close(){
this.dialogRef.close();
}
  requestOtp(){
    this.otp=false;
    this.change=true;
    this.forgetpasswordService.forgetPassword(this.requestPasswordForm.value).subscribe(res=>{
      console.log(res);
    })


  }
  changePassword(){
   if(this.restPassword.value.newPassword===this.restPassword.value.confirmNewPassword){
    const fdata=new FormData();
    fdata.append('password',this.restPassword.value.newPassword);
    fdata.append('otp',this.restPassword.value.otp);
    this.forgetpasswordService.resetPassword(this.requestPasswordForm.value.email,fdata).subscribe(res=>{
      console.log(res);
      this.notification.success('Your password has been changed.');
    })
    this.dialogRef.close();
   }else{
    this.notification.error('Password not matched');
   }
  

  }

}
  