import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from 'src/app/Service/user-services.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  error = true;
  bpage = false;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, public authService: AuthServiceService,
    public router: Router, public notification: ToastrService, public dialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>,
    public route: ActivatedRoute,public userService:UserService) {
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
   onSubmit() {
    this.dialogRef.close(LoginComponent);
    const loginValues = this.login.value;
    this.authService.login(loginValues).subscribe( res => {

        this.storage.set('token', res.headers.get('x-auth'));
         this.storage.set('companyId', JSON.parse(res['_body']).Company_id);
         
        this.userService.userData = JSON.parse(res['_body']);
       
        this.notification.success('Welcome Back', JSON.parse(res['_body']).userName);
        this.router.navigate(['/Dashboard']);
    }, error =>{
      this.notification.error(error._body);
      //console.log(error._body);
    });

      
  }

}
