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

  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  private router: Router, public companyService: CompanyServiceService ,
     public dialog: MatDialog , public route: ActivatedRoute) {
       this.route.queryParams.filter(params => params.edit).subscribe(params => {
         console.log('working');
        this.userService.getUserData().subscribe(res => {
          this.router.navigate(['/bookmark' ]);
      
            console.log('i am working');
            console.log(JSON.parse(res['_body']));
            this.userService.userName = JSON.parse(res['_body']).userName;
            this.userService.location = JSON.parse(res['_body']).location;
            this.userService.title = JSON.parse(res['_body']).title;
            this.userService.userImage=JSON.parse(res['_body']).userImage;
            this.userService.shortBio= JSON.parse(res['_body']).shortBio;



      });
       });



    this.userService.token = this.storage.get('token');
    this.companyService.token = this.storage.get('token');
    this.haveCompany = this.storage.get('companyId');
    if (this.haveCompany) {
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = JSON.parse(res['_body']).companyName;
         this.companyFollowers = JSON.parse(res['_body']).followers.length;
         console.log(JSON.parse(res['_body']));
        });
    }
    this.bioForm = new FormGroup({
      shortBio: new FormControl ('')
    });
  }
  overviewResult;
  ngOnInit() {
console.log('i am working');
this.userService.getUserData().subscribe(res => {
    console.log('i am working');
    this.userService.userName = JSON.parse(res['_body']).userName;
    this.userService.location = JSON.parse(res['_body']).location;
    this.userService.title = JSON.parse(res['_body']).title;
    this.userService.userImage=JSON.parse(res['_body']).userImage;
    this.userService.shortBio= JSON.parse(res['_body']).shortBio;
});
  }
  manageFollowing() {
    this.router.navigate(['/Following'])
  }
  createBPage() {
    this.router.navigate(['/B-page'])
  }
  EditBpage(){
    console.log(this.haveCompany)
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
    // this.router.navigate(['/bookmark' ], {queryParams: {edit: true}});
   }
  addBio() {
    this.bioForm.patchValue({
      shortBio: this.bioForm.value.shortBio
    });
    this.userService.editUser(this.bioForm.value).subscribe(res => {
        console.log('i am working');
        console.log(JSON.parse(res['_body']));
        this.userService.shortBio= JSON.parse(res['_body']).shortBio;
    })
    this.bioEdit = !this.bioEdit;
    this.router.navigate(['/bookmark']);
  }

}