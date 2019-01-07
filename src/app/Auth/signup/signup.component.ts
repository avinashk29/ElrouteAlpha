import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    UserName : new FormControl(''),
    Location : new FormControl(''),
    Email: new FormControl(''),
    Title: new FormControl (''),
    Password: new FormControl('')
  });
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
   public dialog: MatDialog , public dialogRef: MatDialogRef<SignupComponent>, public authService: AuthServiceService,
     public router: Router) {
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
     const SignupForm = this.signupForm.value;
    this.authService.signup(SignupForm).subscribe(res => {
      console.log(JSON.parse(res['_body']));
      // this.authService.token = res.headers.get('x-auth');
     this.storage.set('token', res.headers.get('x-auth'));
     this.authService.token = this.storage.get('token');
      console.log(this.authService.token);
    });
    this.dialogRef.close(SignupComponent);
    this.router.navigate(['/Dashboard']);
    console.log(this.signupForm.value);
  }
}
