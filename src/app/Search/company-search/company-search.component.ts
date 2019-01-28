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
  notlogin=true;
  unbookmarked = true;
  haveFollow=true;
  page;
  result= [];
  userInfo = [];
  userInfoForBookmark = [];
  ngOnInit() {
    this.bookmarkService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');
    this.follows.token = this.storage.get('token');
   this.word = this.route.snapshot.paramMap.get('word');
   this.page = this.route.snapshot.paramMap.get('page');
    this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']))
      this.userInfo = JSON.parse(res['_body']).Following;
       this.userInfoForBookmark=  JSON.parse(res['_body']).bookmarks.company;
      console.log( JSON.parse(res['_body']).bookmarks.company);
      this.search.onSearchCompany(this.word).subscribe(res1=>{
        this.result = JSON.parse(res1['_body']);
        this.bookmarkService.companyfollow =JSON.parse(res1['_body'])[0];
        for (let i=0; i<this.bookmarkService.companyfollow.length; i++) {
          console.log(this.userInfo.length);
          if (this.userInfo.length === 0){
            this.bookmarkService.companyfollow[i].follow = false;
            console.log(this.bookmarkService.companyfollow[i])
          }else{
            console.log(this.bookmarkService.companyfollow[i]._id);
          console.log( this.userInfo[i]);
          if (this.bookmarkService.companyfollow[i]._id === this.userInfo[i]){
            this.bookmarkService.companyfollow[i].follow = true;
            console.log(this.bookmarkService.companyfollow[i].follow)
          }
          }

        }
        //Deletion method for Bookmarks//
        this.bookmarkService.CompanyBookmark=JSON.parse(res1['_body'])[0];
        console.log(this.bookmarkService.CompanyBookmark);
        for(let i=0;i<this.bookmarkService.CompanyBookmark.length;i++){
          console.log(this.userInfoForBookmark.length+'dfghjk')
          if(this.userInfoForBookmark.length === 0){
            this.bookmarkService.CompanyBookmark[i].bookm=false;
          }else{
            console.log(this.bookmarkService.CompanyBookmark[i]._id);
            console.log(this.userInfoForBookmark[i]);
            if(this.bookmarkService.CompanyBookmark[i]._id === this.userInfoForBookmark[i]){
              this.bookmarkService.CompanyBookmark[i].bookm=true;

            }
          }

        }

      });
 })




  }
  // onClick (id) {
  //   this.bookmarkService.count+=1;
  //   console.log(this.userInfo.length);
  //   if (!this.userInfo.length){

  //   console.log(id)
  //   console.log('1');
  //   this.follows.addFollow(id).subscribe(res=>{
  //     console.log(res);
  //   })
  //   console.log( this.bookmarkService.companyfollow[id].follow );
  //   this.bookmarkService.companyfollow[id].follow = !this.bookmarkService.companyfollow[id].follow;

  //   }else{
  //   for (let i = 0; i<this.userInfo.length; i++) {
  //     console.log(this.userInfo[i]);
  //     console.log(id);
  //     if (id === this.userInfo[i]){
  //       this.bookmarkService.companyfollow[i].follow = !this.bookmarkService.companyfollow[id].follow;
  //       console.log(this.bookmarkService.companyfollow[i].follow)
  //       console.log('2')
  //       console.log(id)

  //       this.follows.Unfollow(id).subscribe(res=>{
  //         console.log(res);
  //       })
  //      }
  //      if (this.userInfo[i] !== id) {
  //       this.bookmarkService.companyfollow[i].follow = !this.bookmarkService.companyfollow[id].follow;
  //       console.log(this.bookmarkService.companyfollow[i].follow )
  //       console.log(id)
  //       console.log('3')
  //       this.follows.addFollow(id).subscribe(res=>{
  //         console.log(res);
  //       })
  //      }
  //     }
  // }

  // }
  onfollow(i,id){
    this.bookmarkService.companyfollow[i].follow = true;
    this.follows.addFollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working follow')
  }
  onunfollow(i,id){
    this.bookmarkService.companyfollow[i].follow = false;
    this.follows.Unfollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working unfollow')
  }
 companyBookmark(i,id){
     this.bookmarkService.CompanyBookmark[i].bookm=true;
     this.bookmarkService.addCompanyBookmark(id).subscribe(res=>{
       console.log(res)
     });
     console.log('done')
 }
 deletecompanyBookmark(i,id){
   this.bookmarkService.CompanyBookmark[i].bookm=false;
  this.bookmarkService.DeleteBookmarkCompany(id).subscribe(res=>{
    console.log(res)
  });
 }
 GotoBpage(id){
   this.router.navigate(['/companyPage/'+this.id]);
 }
}
