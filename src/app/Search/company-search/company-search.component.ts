import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { UserService } from 'src/app/Service/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from 'src/app/Service/follow-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { JAN } from '@angular/material';

import {MatDialog, MatDialogConfig} from '@angular/material';
import { LoginComponent } from 'src/app/Auth/login/login.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {
  noResult = false;
  panelOpenState = false;
  word;

  id;
  cresult = [];
  token;
  notlogin = true;
  unbookmarked = true;
  haveFollow = true;
  page;
  result = [];
  // userInfo = [];
  // userBookmark = [];
  
  loading;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,private bookmarkService:BookmarkServices,
   private router:Router,public search: SearchService,private companyService:CompanyServiceService,private userService:UserService,
   private route:ActivatedRoute,public follows:FollowService, public dialog: MatDialog, public notification: ToastrService) { 
    this.route.params.subscribe(params=>{
      this.loading=true;
      this.search.token=this.storage.get('token');
      this.search.onSearchCompany(params.word).subscribe(res1=>{
        this.result = JSON.parse(res1['_body']).searchResult;
      this.loading=false;
      })
    })
   }


  ngOnInit() {
    
    this.bookmarkService.token = this.storage.get('token');
    this.follows.token = this.storage.get('token');
    this.token = this.storage.get('token');
   this.word = this.route.snapshot.paramMap.get('word');
   this.page = this.route.snapshot.paramMap.get('page');
  }


  onfollow(i,id){
    
    this.follows.addFollow(id).subscribe(res=>{
      this.result[0][i].follow=true;
      this.notification.success('Following');
           });
  }
  onunfollow(i,id){
    
    this.follows.Unfollow(id).subscribe(res=>{
      this.result[0][i].follow=false;
      this.notification.success('Unfollow');
           });
  }
 companyBookmark(i,id){
   
     this.bookmarkService.addCompanyBookmark(id).subscribe(res=>{
      this.result[0][i].bookm=true;
      this.notification.success('Added to your company bookmark');

     });
 }
 deletecompanyBookmark(i,id){
  this.result[0][i].bookm=false;
  this.bookmarkService.DeleteBookmarkCompany(id).subscribe(res => {
    this.notification.success('Removed from your company bookmark');
  });
 }
 openLogin() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  this.dialog.open(LoginComponent, dialogConfig);
}
//  GotoBpage(id){
//    this.router.navigate(['/companyPage/'+this.id]);
//  }
}

