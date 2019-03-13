import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.css']
})
export class CompanyContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(public companyService: CompanyServiceService, public fb: FormBuilder,
     public dialogref: MatDialogRef<CompanyContactComponent>,
       @Inject(LOCAL_STORAGE) private storage: WebStorageService, public router: Router) {
    this.contactForm =  this.fb.group({
      contact: this.fb.array([])
    });

  }
companyId = this.storage.get('companyId');

  ngOnInit() {

     this.setContact();
     if (!this.companyService.companyData.contact.length){
               this.addContact();
     }
  //console.log(this.companyService.companyData.contact);

  }
  addContact() {
    const control = <FormArray>this.contactForm.controls.contact;
    control.push(
      this.fb.group({
        divisionName: ['', [Validators.required]],
        divisionEmail: ['', [Validators.required, Validators.email]]
      })
    );
  }

setContact() {
  const control = <FormArray>this.contactForm.controls.contact;
  while (control.length !== 0) {
    control.removeAt(0);
  }
  this.companyService.companyData.contact.forEach(x => {
    control.push(
      this.fb.group({
        divisionName: x.divisionName,
        divisionEmail: x.divisionEmail
      }

      )
    );
  });
}
onSubmit() {
  if(this.contactForm.valid) {
    this.companyService.UpdateCompany(this.contactForm.value).subscribe(res => {
      //console.log(JSON.parse(res['_body']));
      this.dialogref.close(CompanyContactComponent);
      this.router.navigate(['/companyPage/' + this.companyId], {
        queryParams: { urltype: 'contact' }
      });
    });
  }


}
onDelete(index) {
  const control = <FormArray>this.contactForm.controls.contact;
  control.removeAt(index);
  this.companyService.UpdateCompany(this.contactForm.value).subscribe(res => {
    //console.log(JSON.parse(res['_body']));
  });
  //console.log(this.contactForm.value);
}
Onclose(){
  this.dialogref.close(CompanyContactComponent);
}
}
