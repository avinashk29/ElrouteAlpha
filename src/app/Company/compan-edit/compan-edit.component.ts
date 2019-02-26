import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CompanyServiceService } from "../../Service/company-service.service";
import { AuthServiceService } from "src/app/Auth/auth-service.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-compan-edit",
  templateUrl: "./compan-edit.component.html",
  styleUrls: ["./compan-edit.component.css"]
})
export class CompanEditComponent implements OnInit {
  token;
  Id;
  one = true;
  two = false;
  three = false;
  companyName;
  editcompanyForm = new FormGroup({
    companyName: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    companyEmail: new FormControl("", [Validators.required, Validators.email]),
    industry: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    website: new FormControl(""),
    companyType: new FormControl(""),
    Image: new FormControl(""),
    companySize: new FormControl(),
    yearEstd: new FormControl(),
    address: new FormControl(""),
    zipCode: new FormControl(),
    landLine: new FormControl(),
    mobile: new FormControl(),
    shortIntro: new FormControl()
  });
  submitted: boolean;
  imagePreview;
  companyId;
  urlcompanyId;
  Image;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public router: Router,
    public companyService: CompanyServiceService,
    public authService: AuthServiceService,
    public notification: ToastrService,
    private route: ActivatedRoute
  ) {
    this.companyId = this.storage.get("companyId");
  
  }
  ngOnInit() {
    this.companyService.token = this.storage.get("token");
    this.token = this.storage.get("token");
    this.companyService.GetoneCompany(this.companyId).subscribe(res => {
      this.Image = JSON.parse(res["_body"]).Image;
      this.editcompanyForm.patchValue({
        companyName: JSON.parse(res["_body"]).companyName,
        country: JSON.parse(res["_body"]).country,
        companyEmail: JSON.parse(res["_body"]).companyEmail,
        city: JSON.parse(res["_body"]).city,
        industry: JSON.parse(res["_body"]).industry,
        category: JSON.parse(res["_body"]).category,
        website: JSON.parse(res["_body"]).website,
        companyType: JSON.parse(res["_body"]).companyType,
        companySize: JSON.parse(res["_body"]).companySize,
        yearEstd: JSON.parse(res["_body"]).yearEstd,
        address: JSON.parse(res["_body"]).address,
        zipCode: JSON.parse(res["_body"]).zipCode,
        landLine: JSON.parse(res["_body"]).landLine,
        mobile: JSON.parse(res["_body"]).mobile,
        shortIntro: JSON.parse(res["_body"]).shortIntro,
        Image: JSON.parse(res["_body"]).Image
      });
    });
  }
  Showtwo() {
    this.one = false;
    this.two = true;
    this.three = false;
  }
  Showthree() {
    this.one = false;
    this.two = false;
    this.three = true;
  }
  ShowPrev1() {
    this.one = true;
    this.two = false;
    this.three = false;
  }
  ShowPrev2() {
    this.one = false;
    this.two = true;
    this.three = false;
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editcompanyForm.patchValue({ Image: file });
    this.editcompanyForm.get("Image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSubmit() {
    this.companyService.token = this.storage.get("token");
    this.companyService
      .UpdateCompany(this.editcompanyForm.value)
      .subscribe(res => {
        
      });
    this.Id = this.storage.get("companyId");
    this.router.navigate(["/companyPage/" + this.Id], {
      queryParams: { urltype: "default" }
    });
    
  }
}
