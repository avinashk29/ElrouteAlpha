import { Component, OnInit , Inject} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 login = new FormGroup({
   Email: new FormControl(),
   Password: new FormControl()
 });
 error = true;
   constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, public authService: AuthServiceService,
  public router: Router, public notification: ToastrService, public dialog: MatDialog , public dialogRef: MatDialogRef<LoginComponent>,) { }

  ngOnInit() {
  }
  openSignup() {
    this.dialogRef.close(LoginComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(SignupComponent, dialogConfig);
  }
onSubmit() {
 const loginValues = this.login.value;
 this.authService.login(loginValues).subscribe(res => {
  console.log(JSON.parse(res['_body']));
  this.error = false;
  if (!this.error) {
    this.storage.set('token', res.headers.get('x-auth'));
  this.storage.set('companyId', JSON.parse(res['_body']).Company_id);
  this.authService.token =   this.storage.set('token', res.headers.get('x-auth'));
  this.router.navigate(['/Dashboard']);
  this.notification.success('Welcome Back', JSON.parse(res['_body']).UserName);
  } else {
    this.notification.error('Error Login');
  }

 });

}

}
