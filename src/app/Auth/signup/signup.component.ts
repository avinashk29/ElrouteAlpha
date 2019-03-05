import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { LoginComponent } from "../login/login.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthServiceService } from "../auth-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/Service/user-services.service";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialUser
} from "ng4-social-login";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  error;
  username;
  public user: any = SocialUser;
  bpage = false;
  signupForm = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    location: new FormControl("India", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    title: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignupComponent>,
    public authService: AuthServiceService,
    public router: Router,
    public notification: ToastrService,
    public userService: UserService,
    public route: ActivatedRoute,
    private authService1: AuthService
  ) {
    this.route.queryParams
      .filter(params => params.urlRedirect)
      .subscribe(params => {
        let test = params.urlRedirect;
        if ((test = true)) {
          this.bpage = true;
        }
      });
  }
  ngOnInit() {}

  // <-----------------------------to open login------------------------------------>
  openLogin() {
    this.dialogRef.close(SignupComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(LoginComponent, dialogConfig);
  }

  signInWithSocial(serviceProvider):void{
    this.authService1.signIn(serviceProvider.PROVIDER_ID).then(userData => {
      this.user = userData;
      this.signupForm.value.userName = userData.name;
      this.signupForm.value.email = userData.email;
      this.authService.signup(this.signupForm.value).subscribe(res => {
        this.error = false;
        this.storage.set("token", res.headers.get("x-auth"));
        this.authService.token = this.storage.get("token");
        this.dialogRef.close(SignupComponent);
        this.userService.userData = JSON.parse(res['_body']);
      
        if (!this.bpage) {
          this.router.navigate(["/Dashboard"]);
        } else {
          this.router.navigate(["/B-page"]);
        }
        this.notification.success("Sign Up Successful");
      });
    });
  }

  signInWithGoogle(): void {
    let serviceProvider = GoogleLoginProvider;
    this.signInWithSocial(serviceProvider);  
  }

  signInWithLinkedIN(): void {
    let serviceProvider = LinkedinLoginProvider;
    this.signInWithSocial(serviceProvider);
  }


  signInWithFB(): void {
    this.authService1
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.user = userData;
      });
  }

  
  onSubmit() {
    this.error = true;
    const SignupForm = this.signupForm.value;
    this.authService.signup(SignupForm).subscribe(res => {
      this.error = false;
      if (this.signupForm.valid) {
        this.storage.set("token", res.headers.get("x-auth"));
        this.authService.token = this.storage.get("token");
        this.dialogRef.close(SignupComponent);
        this.userService.userData=JSON.parse(res['_body']);
        if (!this.bpage) {
          this.router.navigate(["/Dashboard"]);
        } else {
          this.router.navigate(["/B-page"]);
        }
        this.notification.success("Sign Up Successful");
      }
      if (this.error) {
        this.notification.error("Cant LogIn Enter Valid Details");
      }
    }, error => {
      this.notification.error('Enter Valid details');
    });

  }
}
