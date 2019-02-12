import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { UserService } from 'src/app/Service/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from 'src/app/Service/follow-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { JAN } from '@angular/material';


@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,private bookmarkService:BookmarkServices, private router:Router,public search: SearchService,private companyService:CompanyServiceService,private userService:UserService,private route:ActivatedRoute,public follows:FollowService) { }
  panelOpenState = false;
  word;
  id;
  cresult
  notlogin = true;
  unbookmarked = true;
  haveFollow = true;
  page;
  result = [];
  userInfo = [];
  userBookmark = [];
  ngOnInit() {
    this.bookmarkService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');
    this.follows.token = this.storage.get('token');
   this.word = this.route.snapshot.paramMap.get('word');
   this.page = this.route.snapshot.paramMap.get('page');
    this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']))
      this.userInfo = JSON.parse(res['_body']).following;
       this.userBookmark =  JSON.parse(res['_body']).bookmarks.company;
      //  console.log(this.userBookmark.pop());
      console.log( this.userInfo);
      this.search.onSearchCompany(this.word).subscribe(res1=>{
        this.result = JSON.parse(res1['_body']);
        console.log(this.result)
        this.cresult=JSON.parse(res1['_body'])[0]
        this.id=JSON.parse(res1['_body'])[0][0]
        console.log(this.id)
        // this.bookmarkService.companyfollow =JSON.parse(res1['_body'])[0]; 
         //Addition/Deletion method for Follow//
         for(let i = 0; i < this.userInfo.length; i++) {
          console.log(this.userInfo[i]);
          for(let j = 0;j < this.cresult.length; j++) {
            console.log(this.cresult[j]._id);
               if(this.userInfo[i] == this.cresult[j]._id) {
                console.log(this.cresult[j]._id);
                this.cresult[j].follow=true;
               } else  {
                console.log(this.cresult[j]._id);
                // this.cresult[j].follow=false;
               }
           }      
     }
            //Addition/Deletion method for Bookmarks//
        for(let i = 0; i < this.userBookmark.length; i++) {
          console.log(this.userBookmark[i]);
          for(let j = 0;j < this.cresult.length; j++) {
            console.log(this.cresult[j]._id);
               if(this.userBookmark[i] == this.cresult[j]._id) {
                console.log(this.cresult[j]._id);
                this.cresult[j].bookm=true;
               } else  {
                console.log(this.cresult[j]._id);
                // this.cresult[j].bookm=false;
               }
           }      
     }
      });
 })

  }
  
  onfollow(i,id){
    this.cresult[i].follow=true;
    this.follows.addFollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working follow')
  }
  onunfollow(i,id){
    console.log(id)
    this.cresult[i].follow=false;
    this.follows.Unfollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working unfollow')
  }
 companyBookmark(i,id){
  this.cresult[i].bookm=true;
     this.bookmarkService.addCompanyBookmark(id).subscribe(res=>{
       console.log(res)
      
     });
     console.log(id)
 }
 deletecompanyBookmark(i,id){
  this.cresult[i].bookm=false;
  this.bookmarkService.DeleteBookmarkCompany(id).subscribe(res=>{
    console.log(res)
  });
 }
//  GotoBpage(id){
//    this.router.navigate(['/companyPage/'+this.id]);
//  }
}
