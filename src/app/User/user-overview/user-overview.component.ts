import { Component, OnInit, Inject} from '@angular/core';
import { UserService } from 'src/app/Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { EditComponent } from '../Edit/edit.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit{
  id;
  haveCompany;
  companyName;
  companyId;
  userBio;
  bioEdit = false;
  saveChanges = true;
  bioForm;
  companyFollowers = [];
  subscription;
  userImage;
companyLogo
  constructor(public userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  private router: Router, public companyService: CompanyServiceService ,
     public dialog: MatDialog , public route: ActivatedRoute) {
    this.haveCompany = this.storage.get('companyId');
    if (this.haveCompany) {
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = JSON.parse(res['_body']).companyName;
         this.companyFollowers = JSON.parse(res['_body']).followers.length;
         this.companyLogo=JSON.parse(res['_body']).companyLogo;
        });
    }
    this.bioForm = new FormGroup({
      shortBio: new FormControl ('')
    });
  }
  overviewResult;
  ngOnInit() {
    this.companyName=this.companyService.companyData.companyName;
     this.userService.getUserData().subscribe(res => {
       this.userService.userData=JSON.parse(res['_body']);
});
  }
  manageFollowing() {
    this.router.navigate(['/Following'])
  }
  createBPage() {
    this.router.navigate(['/B-page'])
  }
  EditBpage(){
    this.router.navigate(['/editcompany/' + this.haveCompany]);
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(EditComponent, dialogConfig);

  }
  editBio(){
    this.bioEdit = !this.bioEdit;
   }
  addBio() {
    this.bioForm.patchValue({
      shortBio: this.bioForm.value.shortBio
    });
    this.userService.editUser(this.bioForm.value).subscribe(res => {
        this.userService.userData.shortBio= JSON.parse(res['_body']).shortBio;
    })
    this.bioEdit = !this.bioEdit;
    this.router.navigate(['/bookmark']);
  }

}