import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material";
import { SignupComponent } from "src/app/Auth/signup/signup.component";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SearchService } from "src/app/Service/search.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginComponent } from "src/app/Auth/login/login.component";
import { ToastrService } from "ngx-toastr";
// import * as $ from 'jquery';

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
    public route: ActivatedRoute
  ) {}

  contactFrom = new FormGroup({
    Need: new FormControl(""),
    Email: new FormControl("")
  });
  searchForm = new FormGroup({
    word: new FormControl(""),
    page: new FormControl("1")
  });
  ngOnInit() {
    this.token = this.storage.get("token");
    if (this.token) {
      this.router.navigate(["/Dashboard"]);
    }
  }
  ngAfterViewInit() {
  
  }

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
    this.searchService.onSearch(name, formData.page);
    this.searchService.searchValue = formData;
    this.router.navigate(["/Result/" + name + "/" + formData.page]);
  }
  OnSendrequest() {
    this.notification.success(
      "Thanks for Submitting your needs we will get back to you soon at " +
        this.contactFrom.value.Email
    );
    this.contactFrom.reset();
  }

}
