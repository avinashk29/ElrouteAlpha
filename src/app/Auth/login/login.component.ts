import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from 'src/app/Service/user-services.service';
import { SocialService } from 'ng6-social-button';
import { SocialUser } from 'ng6-social-button/lib/entities';
import {ForgetPasswordComponent} from '../forget-password/forget-password.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  error = true;
  bpage = false;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, public authService: AuthServiceService,
    public router: Router, public notification: ToastrService, public dialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>,
    public route: ActivatedRoute,public userService:UserService,private socialAuthService: SocialService) {
    this.route.queryParams.filter(params => params.urlRedirect).subscribe(params => {
      const test = params.urlRedirect;
      if (test === true) {
        this.bpage = true;
      }
    });
  }

  ngOnInit() {
  }
  openSignup() {
    this.dialogRef.close(LoginComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(SignupComponent, dialogConfig);
  }
  openForgetPassword(){
    this.dialogRef.close(LoginComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(ForgetPasswordComponent, dialogConfig);
  }
   onSubmit() {
if (this.login.valid) {
  this.dialogRef.close(LoginComponent);
  const loginValues = this.login.value;
  this.authService.login(loginValues).subscribe( res => {
console.log(this.storage)
// this.storage.remove;
this.storage.set('token', res.headers.get('x-auth'));
       this.storage.set('companyId', JSON.parse(res['_body']).Company_id);

      this.userService.userData = JSON.parse(res['_body']);

      this.notification.success('Welcome Back', JSON.parse(res['_body']).userName);
      this.router.navigate(['/Dashboard']);
  }, error =>{
    this.notification.error(error._body);
    // console.log(error._body);
  });
}


  }
  closeLogin() {
    this.dialogRef.close();
  }
  getSocialUser(socialUser) {
  // console.log(socialUser);
    // this.login.value.userName = socialUser.name;
    this.login.value.email = socialUser.email;
    // this.login.value.password = socialUser.id;
    // this.login.value.password = socialUser.idToken;

  // console.log(this.login.value);
    this.authService.login(this.login.value).subscribe( res => {
      // this.storage=null;
      this.storage.set('token', res.headers.get('x-auth'));
      this.storage.set('companyId', JSON.parse(res['_body']).Company_id);

     this.userService.userData = JSON.parse(res['_body']);

     this.notification.success('Welcome Back', JSON.parse(res['_body']).userName);
     this.router.navigate(['/Dashboard']);
    // console.log(res);


  });
}

}
