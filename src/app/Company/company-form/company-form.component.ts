import { Component, OnInit, Inject, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator
} from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyServiceService } from "../../Service/company-service.service";
import { AuthServiceService } from "src/app/Auth/auth-service.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-company-form",
  templateUrl: "./company-form.component.html",
  styleUrls: ["./company-form.component.css"]
})
export class CompanyFormComponent implements OnInit {
  token;
  Id;
  companyForm = new FormGroup({
    companyName: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    companyEmail: new FormControl("", [Validators.required, Validators.email]),
    industry: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required])
   
  });
  submitted: boolean;
  imagePreview;
  companyId;
  urltype;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public router: Router,
    public companyService: CompanyServiceService,
    public authService: AuthServiceService,
    public notification: ToastrService
  ) {
    this.companyId = this.storage.get("companyId");
    if (this.companyId) {
      this.router.navigate(["/companyPage/" + this.companyId], {
        queryParams: { urltype: "default" }
      });
    }
   
  }
  ngOnInit() {
    // this.companyService.token = this.storage.get("token");
    this.token = this.storage.get("token");
  }

 
  onSubmit() {
    if (this.companyForm.valid) {
      const companyData = this.companyForm.value;
      this.companyService.addCompany(companyData).subscribe(res => {
        if (res) {
          this.storage.set("companyId", JSON.parse(res["_body"])._id);
          this.Id = this.storage.get("companyId");
          this.router.navigate(["/companyPage/" + this.Id], {
            queryParams: { urltype: "default" }
          });
        }
      });

      this.notification.success(
        "Welcome" + "  " + this.companyForm.value.companyName
      );
    } else {
      this.notification.error("Enter Valid Deatils");
    }
  }
}
