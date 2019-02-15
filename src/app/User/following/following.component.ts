import { Component, OnInit,Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import {UserService} from 'src/app/Service/user-services.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  

  followings=[];
  companyBookmark
  panelOpenState = false;
  word;
  id;
  page;
  companyId
  result = [];
  userInfo = [];
  userBookmark = [];
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService,private router:Router,private following:FollowService,private bookmarkService:BookmarkServices,private companyService:CompanyServiceService,private userService:UserService,public follows:FollowService) { 
  
   }

  ngOnInit() {
    this.following.token=this.storage.get('token');
    this.bookmarkService.token=this.storage.get('token');
   
   this.bookmarkService.getBookmarkCompany().subscribe(res=>{
    this.companyBookmark=JSON.parse(res['_body']).length;
   })

this.following.getFollowing().subscribe(res1=>{
  this.followings=JSON.parse(res1['_body']);
  
  console.log(this.followings)
  this.userService.getUserData().subscribe(res=>{
    this.userInfo=JSON.parse(res['_body']).following;
    for (let i=0; i<this.followings.length; i++) {
      console.log(this.userInfo.length);
      if (this.userInfo.length === 0){
        this.followings[i].follow = false;
        console.log(this.followings[i])
      } else {
      console.log( this.userInfo[i]);
      if (this.followings[i]._id === this.userInfo[i]){
      this.followings[i].follow = true;
        console.log(this.followings[i].follow)
      }
      }
  
    }
  })
})
  }

  onfollow(i,id){
    this.followings[i].follow = true;
    this.follows.addFollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working follow')
  }
  onunfollow(i,id){
    console.log(id)
    this.followings[i].follow = false;
    this.follows.Unfollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working unfollow')
  }
  gotoBpage(id){
    this.router.navigate(['/companyPage/'+id ], {queryParams: {urltype : 'default'}});;
  }
}
