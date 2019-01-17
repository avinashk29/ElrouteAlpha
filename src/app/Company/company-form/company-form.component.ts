import { Component, OnInit  , Inject, Input} from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { Router} from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import { AuthServiceService } from 'src/app/Auth/auth-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  token;
  Id;
  one = true;
  two = false;
  three = false;
  companyForm = new FormGroup ({
  companyName: new FormControl('',[Validators.required]),
   country: new FormControl('',[Validators.required]),
   city: new FormControl('',[Validators.required]),
   companyEmail: new FormControl('',[Validators.required,Validators.email]),
   industry: new FormControl('',[Validators.required]),
   category: new FormControl('',[Validators.required]),
   website: new FormControl(''),
   companyType: new FormControl(''),
   image: new FormControl(''),
   companySize: new FormControl(''),
   yearEstd: new FormControl(''),
   address: new FormControl(''),
  // city: new FormControl(''),
  zipCode: new FormControl(''),
  landLine: new FormControl(''),
  mobile: new FormControl('')
  }) ;
  submitted: boolean;
  imagePreview;
companyId;
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
  public router: Router, public companyService: CompanyServiceService , public authService: AuthServiceService,
   public notification: ToastrService) {
this.companyId = this.storage.get('companyId');
if (this.companyId) {
this.router.navigate(['/companyPage/' + this.companyId]);
}
//  if (this.Id != null) {
//    this.router.navigate(['/companyPage']);
//  }
   }
  ngOnInit() {
    this.companyService.token = this.storage.get('token');
    this.token =  this.storage.get('token');
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
ShowPrev1(){
  this.one=true;
  this.two=false;
  this.three=false;
}
ShowPrev2(){
  this.one=false;
  this.two=true;
  this.three=false;
}

   onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.companyForm.patchValue({image: file});
    this.companyForm.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
   }
  onSubmit() {
    if (this.companyForm.valid) {
      console.log(this.companyForm.value);
      const companyData = this.companyForm.value;
      console.log(this.token);
          this.companyService.addCompany(companyData).subscribe(res => {
            if (res) {
              this.storage.set('companyId' , JSON.parse(res['_body'])._id);
              console.log(JSON.parse(res['_body']));
              this.companyService.Id =  this.storage.get('comapnyId');
            }

           });


           this.Id = this.storage.get('companyId');

      this.router.navigate(['/companyPage/' + this.Id]);
      this.notification.success('Welcome' + this.companyForm.value.companyName);
    } else {
      this.notification.error('Enter Valid Deatils');
    }


  }

}
