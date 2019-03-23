import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import {BookmarkServices} from '../../Service/bookmark-services.service';
import {FollowService} from 'src/app/Service/follow-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from 'src/app/Service/user-services.service';
import { LoginComponent } from 'src/app/Auth/login/login.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { FeedShareComponent } from 'src/app/Post-feed/feed-share/feed-share.component';
import { FeedService } from 'src/app/Service/feed-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsSearchComponent implements OnInit {

  userInfo = [];
  productId;
  feedResult = [];
  token;
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,
   public bookmarkService: BookmarkServices,private router:Router,
   public follows: FollowService,private UserService:UserService, public route: ActivatedRoute,  public dialog: MatDialog,
    public feedService: FeedService, public notification: ToastrService) { }
word;
page;
  ngOnInit() {
    this.token = this.storage.get('token');
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
if(this.token){
  this.bookmarkService.token = this.storage.get('token');
  this.UserService.getUserData().subscribe(res=>{
 this.userInfo=JSON.parse(res['_body']).bookmarks.post;
 this.search.onSearchFeed(this.word , this.page).subscribe(res1=>{
   this.feedResult=JSON.parse(res1['_body']);

   console.log(this.feedResult)
     this.productId=JSON.parse(res1['_body']);
     for(let i = 0; i < this.userInfo.length; i++) {
       for(let j = 0;j < this.productId.length; j++) {
            if(this.productId[j]==null){

            }else{
             if(this.userInfo[i] == this.productId[j]._id) {
              this.productId[j].bookm=true;
             } else  {
              // this.productId[j].bookm=true;
             }
            }
        }
  }

 });
});
} else {
  this.search.onSearchFeed(this.word , this.page).subscribe(res1 => {
    this.feedResult = JSON.parse(res1['_body']);
    console.log(this.feedResult)
      this.productId = JSON.parse(res1['_body']);
      console.log(JSON.parse(res1['_body']));

  });
}
  }

  follow(id) {
      this.follows.addFollow(id).subscribe(res => {
        this.notification.success('Following');
      });
  }

  onBookmark(i,id) {
      this.productId[i].bookm=true;
      this.bookmarkService.addPostBookmark(id).subscribe(res => {
        this.notification.success('Bookmark');
      });
   }
   OndeleteBookmark(i,id){
    this.productId[i].bookm=false;
    this.bookmarkService.DeletePostBookmark(id).subscribe(res => {
      this.notification.success('UnBookmark');
    });
   }

  GotoBpage(id){
    this.router.navigate(['/companyPage/'+id], {queryParams: {urltype : 'default'}});
  }
  openLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }
  onSharepost(i, admin) {
    console.log(i);
    console.log(admin);
    this.feedService.postId = i;
    this.feedService.postadmin = admin;
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;

      dialogConfig.width = '20%';
      this.dialog.open(FeedShareComponent, dialogConfig);
  }
}
