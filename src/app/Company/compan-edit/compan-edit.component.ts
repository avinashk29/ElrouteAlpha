import { Component, OnInit,Inject } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import { AuthServiceService } from 'src/app/Auth/auth-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-compan-edit',
  templateUrl: './compan-edit.component.html',
  styleUrls: ['./compan-edit.component.css']
})
export class CompanEditComponent implements OnInit {

  token;
  Id;
  one = true;
  two = false;
  three = false;
  companyName;
  editcompanyForm = new FormGroup ({
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
console.log(this.companyId)
// if (this.companyId) {
// this.router.navigate(['/companyPage/' + this.companyId]);
// }
//  if (this.Id != null) {
//    this.router.navigate(['/companyPage']);
//  }
   }
  ngOnInit() {
    this.companyService.token = this.storage.get('token');
    this.token =  this.storage.get('token');
    this.companyService.GetoneCompany(this.companyId).subscribe(res=>{
      console.log(res);
      this.companyName=JSON.parse(res['_body']).companyName;
      console.log(this.companyName);
      this.editcompanyForm.patchValue({
        companyName:JSON.parse(res['_body']).companyName,
        country:JSON.parse(res['_body']).country,
        companyEmail:JSON.parse(res['_body']).companyEmail,
        city:JSON.parse(res['_body']).city,
        industry:JSON.parse(res['_body']).industry,
        category:JSON.parse(res['_body']).category,
        website:JSON.parse(res['_body']).website,
        companyType:JSON.parse(res['_body']).companyType,
        companySize:JSON.parse(res['_body']).companySize,
        yearEstd:JSON.parse(res['_body']).yearEstd,
        address:JSON.parse(res['_body']).address,
        zipCode:JSON.parse(res['_body']).zipCode,
        landLine:JSON.parse(res['_body']).landLine,
        mobile:JSON.parse(res['_body']).mobile,

      })
    })

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
    this.editcompanyForm.patchValue({image: file});
    this.editcompanyForm.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
   }
  onSubmit() {
    if (this.editcompanyForm.valid) {
      //console.log(this.editcompanyForm.value);
      const companyData = this.editcompanyForm.value;
      console.log(this.token);
      console.log(this.companyId)
          this.companyService.UpdateCompany(this.companyId,companyData).subscribe(res => {
            // if (res) {
            //   this.storage.set('companyId' , JSON.parse(res['_body'])._id);
            //   console.log(JSON.parse(res['_body']));
            //   this.companyService.Id =  this.storage.get('comapnyId');
            // }
                console.log(res)
           });
           this.Id = this.storage.get('companyId');
      this.router.navigate(['/companyPage/' + this.Id]);
      //this.notification.success('Welcome' + this.companyForm.value.companyName);
    } else {
      this.notification.error('Enter Valid Deatils');
    }


  }

  }

