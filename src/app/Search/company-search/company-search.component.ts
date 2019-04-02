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
  userInfo = [];
  userBookmark = [];
  unfilteredresult;
  loading;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,private bookmarkService:BookmarkServices,
   private router:Router,public search: SearchService,private companyService:CompanyServiceService,private userService:UserService,
   private route:ActivatedRoute,public follows:FollowService, public dialog: MatDialog, public notification: ToastrService) { 
    this.route.params.subscribe(params=>{
      this.loading=true;
      this.search.onSearchCompany(params.word).subscribe(res1=>{
        this.unfilteredresult = JSON.parse(res1['_body']).searchResult;
       this.result = this.unfilteredresult.filter(el=>{
 return el !=null;
       })
      //// console.log(this.result)
      if(this.result.length>0){
       this.cresult = this.result[0];
       this.id=this.result[0][0];
      }

       var number=this.cresult.length;
       if(!this.result.length) {
         this.noResult = true;
       ;  
       }

     this.search.setOption(number)
     this.token = this.storage.get('token'); 
if(this.token){
      //Addition/Deletion method for Follow//
      for(let i = 0; i < this.userInfo.length; i++) {
       for(let j = 0;j < this.cresult.length; j++) {
            if(this.userInfo[i] == this.cresult[j]._id) {
             this.cresult[j].follow=true;
            } else  {
             // this.cresult[j].follow=false;
            }
        }
  }
         //Addition/Deletion method for Bookmarks//
     for(let i = 0; i < this.userBookmark.length; i++) {
       for(let j = 0;j < this.cresult.length; j++) {
            if(this.userBookmark[i] == this.cresult[j]._id) {
             this.cresult[j].bookm=true;
            } else  {
             // this.cresult[j].bookm=false;
            }
        }
  }
}
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
if(this.token) {
  this.userService.getUserData().subscribe(res => {

    this.userInfo = JSON.parse(res['_body']).following;
     this.userBookmark =  JSON.parse(res['_body']).bookmarks.company;
  
    
    
    });
}

  }


  onfollow(i,id){
    this.cresult[i].follow=true;
    this.follows.addFollow(id).subscribe(res=>{
      this.notification.success('Following');
           });
  }
  onunfollow(i,id){
    this.cresult[i].follow=false;
    this.follows.Unfollow(id).subscribe(res=>{
      this.notification.success('Unfollow');
           });
  }
 companyBookmark(i,id){
  this.cresult[i].bookm=true;
     this.bookmarkService.addCompanyBookmark(id).subscribe(res=>{
      this.notification.success('Company Bookmark');

     });
 }
 deletecompanyBookmark(i,id){
  this.cresult[i].bookm=false;
  this.bookmarkService.DeleteBookmarkCompany(id).subscribe(res => {
    this.notification.success('Company Unbookmark');
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
