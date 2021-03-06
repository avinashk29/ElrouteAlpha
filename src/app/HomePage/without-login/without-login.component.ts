import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { SignupComponent } from "src/app/Auth/signup/signup.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SearchService } from "src/app/Service/search.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginComponent } from "src/app/Auth/login/login.component";
import { ToastrService } from "ngx-toastr";
import {ForgetPasswordComponent} from 'src/app/Auth/forget-password/forget-password.component'
// import {LandingPageComponent} from 'src/app/landing-page/landing-page.component'
import{TradeCatalystComponent} from 'src/app/HomePage/trade-catalyst/trade-catalyst.component';
import { Title } from "@angular/platform-browser";
@Component({
  selector: "app-without-login",
  templateUrl: "./without-login.component.html",
  styleUrls: ["./without-login.component.css"]
})
export class WithoutLoginComponent implements OnInit {
  token;
  noFeeds = false;
  constructor(
    @Inject(LOCAL_STORAGE) public storage: WebStorageService,
    public dialog: MatDialog,
    public notification: ToastrService,
    public searchService: SearchService,
    private router: Router,
    public route: ActivatedRoute,
    public title:Title
  ) {}

  contactFrom = new FormGroup({
    Need: new FormControl("",Validators.required),
    Email: new FormControl("",Validators.required)
  });
  searchForm = new FormGroup({
    word: new FormControl(""),
    page: new FormControl("1")
  });
  ngOnInit() {
    this.title.setTitle('Elroute')

    this.token = this.storage.get("token");
    if (this.token) {
      this.router.navigate(["/Dashboard"]);
    }
  }
  ngAfterViewInit() {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(SignupComponent, dialogConfig);
  }
  openLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(LoginComponent, dialogConfig);
  }
  onSearch(name) {
    const formData = this.searchForm.value;

    this.searchService.searchValue = formData;
    this.router.navigate(["/company-results/" + name + "/" + formData.page]);

  }
  OnSendrequest() {
    if(!this.contactFrom.value.Email){
      this.notification.error('Please fill the required information!')
    }else{
      this.notification.success(
        "Thanks for Submitting your needs we will get back to you soon at " +
          this.contactFrom.value.Email
      );
    }
    this.contactFrom.reset();
  }
  openTradeCatalyst(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(TradeCatalystComponent,dialogConfig);
  }

}
