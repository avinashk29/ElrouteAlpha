import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { EditComponent } from '../Edit/edit.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  id;
  username;
  title;
  location;
  haveCompany;
  companyName;
  companyId;
  userBio;
  bioEdit = false;
  bioForm;
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,private router:Router, public companyService: CompanyServiceService ,  public dialog: MatDialog ) {
    this.userService.token = this.storage.get('token');
    this.companyService.token = this.storage.get('token')
    this.haveCompany = this.storage.get('companyId');
    if(this.haveCompany){
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = JSON.parse(res['_body']).companyName;
        this.companyId = JSON.parse(res['_body'])._id;
        this.userBio = JSON.parse(res['_body']).ShortBio;
        });
    }
    this.bioForm = new FormGroup({
      ShortBio: new FormControl ('')
    })
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.username = JSON.parse(res['_body']).UserName;
      this.location = JSON.parse(res['_body']).Location;
      this.title = JSON.parse(res['_body']).Title;
      console.log(this.username);
      this.userBio = JSON.parse(res['_body']).ShortBio;
      console.log(JSON.parse(res['_body']));
      console.log(this.userBio);
    });
  }
  overviewResult;
  ngOnInit() {
  }
  createBPage(){
    this.router.navigate(['/B-page'])
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(EditComponent, dialogConfig);
  }
  editBio(){
    this.bioEdit = !this.bioEdit
   }
  addBio(){
    this.bioForm.patchValue({
      ShortBio: this.bioForm.value.ShortBio
    });
    this.userService.editUser(this.bioForm.value).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    })
  }
}
