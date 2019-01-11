import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user-services.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error = true;
  username;
  signupForm = new FormGroup({
    UserName : new FormControl(''),
    Location : new FormControl(''),
    Email: new FormControl(''),
    Title: new FormControl (''),
    Password: new FormControl('')
  });
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
   public dialog: MatDialog , public dialogRef: MatDialogRef<SignupComponent>, public authService: AuthServiceService,
     public router: Router, public notification: ToastrService,public userService:UserService) {
 }
  ngOnInit() {

  }

// <-----------------------------to open login------------------------------------>
//   openLogin() {
//     this.dialogRef.close(SignupComponent);
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.autoFocus = true;
//     dialogConfig.width = '30%';
//     this.dialog.open(LoginComponent, dialogConfig);
//   }
// onSubmit() {
//      const SignupForm = this.signupForm.value;

//     this.authService.signup(SignupForm).subscribe(res => {
//       this.error = false;
//      if (this.error === false) {
//       console.log(JSON.parse(res['_body']));
//      this.storage.set('token', res.headers.get('x-auth'));
//     //  this.storage.set('User', JSON.parse(res['_body']));
//      this.authService.token = this.storage.get('token');
//      this.dialogRef.close(SignupComponent);
//      /*-----------------------*/

<<<<<<< HEAD
//       this.userService.getUserData().subscribe(res=>{
//    this.storage.set('UserName',JSON.parse(res['_body']).UserName);
//    this.storage.set('Location',JSON.parse(res['_body']).Location);
//    this.username=this.storage.get('UserName');
//    console.log(this.username);
//    console.log(JSON.parse(res['_body']));
//   })
=======
  //     this.userService.getUserData().subscribe(res=>{
  //  this.storage.set('UserName',JSON.parse(res['_body']).UserName);
  //  this.storage.set('Location',JSON.parse(res['_body']).Location);
  //  this.username=this.storage.get('UserName');
  //  console.log(this.username);
  //  console.log(JSON.parse(res['_body']));
  // })
>>>>>>> ecf9aeecb1f25d864529b98053940e26bc0a563e

//      /*---------------------*/

//     //  this.router.navigate(['/Dashboard']);
//     //  this.notification.success('LogIn Successful');
//     //   console.log(this.authService.token);
//     //   console.log('1' + this.error);

<<<<<<< HEAD
//      }

//     });
//     if (this.error) {
//       this.notification.error('Cant LogIn Enter Valid Details');
//      console.log('3' + this.error);
//    }
//  console.log(this.error);
//   }
 }
=======
     }  if (this.error) {
      this.notification.error('Cant LogIn Enter Valid Details');
     console.log('3' + this.error);
   }

    });

 console.log(this.error);
  }
}
>>>>>>> ecf9aeecb1f25d864529b98053940e26bc0a563e
