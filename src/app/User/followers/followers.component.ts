import { Component, OnInit , Inject, AfterViewInit} from '@angular/core';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OnefollowerComponent } from '../onefollower/onefollower.component';
import { FollowService } from 'src/app/Service/follow-service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit{

  constructor( private companyService: CompanyServiceService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    
    public dialog: MatDialog,
    public router:Router,
    public followService: FollowService) {
      this.loading=true;
     }
followers = [];
loading;
// ngAfterViewInit() {
// // console.log(this.loading)
//   this.router.events
//       .subscribe((event) => {
//           if(event instanceof NavigationStart) {
//               this.loading = true;
//           }
//           else if (
//               event instanceof NavigationEnd || 
//               event instanceof NavigationCancel
//               ) {
//               this.loading = false;
//           }
//       });
//     // console.log(this.loading)
// }
  ngOnInit() {
    
    
    // this.companyService.token = this.storage.get('token');
    this.companyService.getCompanyFollowers().subscribe(res => {
      this.followers = JSON.parse(res['_body']);
      this.loading=false;
    });
    // this.spinner.hide();
    
  }
  Openpopup(id) {
    this.followService.followerId = id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(OnefollowerComponent, dialogConfig);

  }
  goToCompany(id) {
  
  
      
      this.router.navigate(['/companyPage/'+id],{queryParams:{ urltype: 'default'}} )  
  
    
  } 
  
}
