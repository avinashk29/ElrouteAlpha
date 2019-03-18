import { Component, OnInit, Inject} from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { EditComponent } from '../Edit/edit.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ImageUploadService } from '../../Service/imageupload-service.service';

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
  file;
  url;
  bioEdit = false;
  saveChanges = true;
  bioForm;
  feedImage;
  imagePreview;
  companyFollowers = [];
  subscription;
  userImage;
companyLogo;
userFollowing;
  constructor(public userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  private router: Router, public companyService: CompanyServiceService ,
     public dialog: MatDialog , public route: ActivatedRoute,private imageService: ImageUploadService) {
      
    this.haveCompany = this.storage.get('companyId');
    this.companyName = this.companyService.companyData.companyName;
    this.userService.getUserData().subscribe(res => {
      this.userService.userData = JSON.parse(res['_body']);
      this.shortBio=     JSON.parse(res['_body']).shortBio;
this.userFollowing=JSON.parse(res['_body']).following.length;
   //console.log(this.userFollowing)

});
    if (this.haveCompany) {
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = JSON.parse(res['_body']).companyName;
         this.companyFollowers = JSON.parse(res['_body']).followers.length;
         this.companyLogo = JSON.parse(res['_body']).companyLogo;
        });
    }
    this.bioForm = new FormGroup({
      shortBio: new FormControl ('')
    });
  }
  overviewResult;
  ngOnInit() {

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
  shortBio;
  editBio(){
    this.bioEdit = !this.bioEdit;

   }
  addBio() {
    this.bioForm.patchValue({
      shortBio: this.bioForm.value.shortBio
    });
    this.userService.editUser(this.bioForm.value).subscribe(res => {
        // this.shortBio= JSON.parse(res['_body']).shortBio;
    })
    this.bioEdit = !this.bioEdit;
    this.router.navigate(['/bookmark']);
  }
  uploadUserImage(event,name){
    this.file = <File>event.target.files[0];
   if(name === 'Image'){
     const reader =new FileReader();
     reader.onload=()=>{
       this.imagePreview=reader.result;
     };
     reader.readAsDataURL(this.file);
   }
    const fdata = new FormData();
     fdata.append(name,this.file);
    //  this.spinner.show();
    
    this.imageService.uploadImg(fdata).subscribe(res=>{
      const formdata=new FormData();
      this.url=res['_body'];
      formdata.append(name,this.url);
      if(name==='userImage'){
       this.userService.editUser(formdata).subscribe(res=>{
         this.userService.userData.userImage=JSON.parse(res['_body']).userImage;
         // this.spinner.hide();
         });
      }else{
       this.feedImage=this.url;
       // this.spinner.hide();
      }
      // this.spinner.hide();
    })
 }

}
