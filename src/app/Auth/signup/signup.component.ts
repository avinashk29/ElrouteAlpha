import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {Router, ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user-services.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error;
  username;
  bpage = false;
  signupForm = new FormGroup({
    userName : new FormControl('',[Validators.required]),
    location : new FormControl('India', [Validators.required]),
    email: new FormControl('' , [Validators.required]),
    title: new FormControl ('', [Validators.required]),
    password: new FormControl('' , [Validators.required])
  });
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
   public dialog: MatDialog , public dialogRef: MatDialogRef<SignupComponent>, public authService: AuthServiceService,
     public router: Router, public notification: ToastrService,public userService:UserService, public route: ActivatedRoute) {
      this.route.queryParams.filter(params => params.urlRedirect).subscribe(params => {
        let test = params.urlRedirect;
        if (test = true) {
          console.log('working');
           this.bpage = true;
        }
      });

 }
  ngOnInit() {
  }

// <-----------------------------to open login------------------------------------>
  openLogin() {
    this.dialogRef.close(SignupComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }
onSubmit() {
  this.error = true;
     const SignupForm = this.signupForm.value;
     /*-----------------------*/
  //     this.userService.getUserData().subscribe(res=>{
  //  this.storage.set('UserName',JSON.parse(res['_body']).UserName);
  //  this.storage.set('Location',JSON.parse(res['_body']).Location);
  //  this.storage.set('_id',JSON.parse(res['_body'])._id);
  //  this.username = this.storage.get('UserName');
  //  console.log(this.username);
  //  console.log(JSON.parse(res['_body']));
  // });
     /*---------------------*/
    this.authService.signup(SignupForm).subscribe(res => {
      this.error = false;
     if (this.signupForm.valid) {
      console.log(JSON.parse(res['_body']));
     this.storage.set('token', res.headers.get('x-auth'));
    //  this.storage.set('User', JSON.parse(res['_body']));
     this.authService.token = this.storage.get('token');
     this.dialogRef.close(SignupComponent);
     if (!this.bpage) {
      this.router.navigate(['/Dashboard']);
     } else {
      this.router.navigate(['/B-page']);
     }

     this.notification.success('Sign Up Successful');
      console.log(this.authService.token);
      console.log('1' + this.error);
  }  if (this.error) {
      this.notification.error('Cant LogIn Enter Valid Details');
     console.log('3' + this.error);
   }

//   });
//      /*---------------------*/
  //   this.authService.signup(SignupForm).subscribe(res => {
  //     this.error = false;
  //    if (this.error === false) {
  //     console.log(JSON.parse(res['_body']));
  //    this.storage.set('token', res.headers.get('x-auth'));
  //   //  this.storage.set('User', JSON.parse(res['_body']));
  //    this.authService.token = this.storage.get('token');
  //    this.dialogRef.close(SignupComponent);
  //    this.router.navigate(['/Dashboard']);
  //    this.notification.success('LogIn Successful');
  //     console.log(this.authService.token);
  //     console.log('1' + this.error);
  //   }  if (this.error) {
  //     this.notification.error('Cant LogIn Enter Valid Details');
  //    console.log('3' + this.error);
  //  }

  //   });

 console.log(this.error);
  });

}
}


