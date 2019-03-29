import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserService } from 'src/app/Service/user-services.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
userInfo=[];
userBookmark=[];
noResult = false;
  constructor(public bookmarkService: BookmarkServices, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  private userService:UserService,private follows:FollowService, public notifcation: ToastrService) { }
result=[]
  ngOnInit() {
    this.bookmarkService.token = this.storage.get('token');
    this.follows.token=this.storage.get('token');
    this.userService.getUserData().subscribe(res=>{
      //console.log(res)
      this.userInfo=JSON.parse(res['_body']).following;
      this.userBookmark=JSON.parse(res['_body']).bookmarks.company;
      this.bookmarkService.getBookmarkCompany().subscribe(res1 => {
        this.result=JSON.parse(res1['_body']);
        console.log(JSON.parse(res1['_body']))

          //Addition/Deletion method for Follow//
          for(let i = 0; i < this.userInfo.length; i++) {
            for(let j = 0;j < this.result.length; j++) {
                 if(this.userInfo[i] == this.result[j]._id) {
                  this.result[j].follow=true;
                 } else  {
                  // this.cresult[j].follow=false;
                 }
             }
       }
              //Addition/Deletion method for Bookmarks//
          for(let i = 0; i < this.userBookmark.length; i++) {
            for(let j = 0;j < this.result.length; j++) {
                 if(this.userBookmark[i] == this.result[j]._id) {
                  this.result[j].bookm=true;
                 } else  {
                  // this.cresult[j].bookm=false;
                 }
             }
       }
   });

    })

  }

  onfollow(i,id){
    this.result[i].follow=true;
    this.follows.addFollow(id).subscribe(res => {
this.notifcation.success('Following');
           });
  }
  onunfollow(i,id){
    this.result[i].follow=false;
    this.follows.Unfollow(id).subscribe(res => {
      this.notifcation.success('Unfollowing');
           });
  }
 companyBookmark(i,id){
  this.result[i].bookm=true;
     this.bookmarkService.addCompanyBookmark(id).subscribe(res => {
      this.notifcation.success('Bookmark');
     });
 }
 deletecompanyBookmark(id){
  if (confirm('Are you sure you want to unbookmark the company?')){
  // this.result[i].bookm=false;
  console.log(id);
  this.bookmarkService.DeleteBookmarkCompany(id).subscribe(res => {
    this.bookmarkService.getBookmarkCompany().subscribe(response => {
      this.result=JSON.parse(response['_body']);
  });
});
 }
}
}

