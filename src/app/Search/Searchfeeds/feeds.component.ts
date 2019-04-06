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
  loading;
  
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,
   public bookmarkService: BookmarkServices,private router:Router,
   public follows: FollowService,private UserService:UserService, public route: ActivatedRoute,  public dialog: MatDialog,
    public feedService: FeedService, public notification: ToastrService) {
      this.route.params.subscribe(params=>{
        
        this.loading=true;
      this.search.onSearchFeed(params.word , params.page).subscribe(res1 => {
        this.feedResult= JSON.parse(res1['_body']).searchResult;
    this.loading=false;
      });
    });
     }
word;
page;
  ngOnInit() {
    this.search.token =this.storage.get('token');
    this.token = this.storage.get('token');
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
 

  }

  follow(id) {
      this.follows.addFollow(id).subscribe(res => {
        this.notification.success('Following');
      });
  }

  onBookmark(i,id) {
      
      this.bookmarkService.addPostBookmark(id).subscribe(res => {
        this.feedResult[i].bookm=true;
        this.notification.success('Added to your product bookmark');
      });
   }
   OndeleteBookmark(i,id){
    
    this.bookmarkService.DeletePostBookmark(id).subscribe(res => {
      this.feedResult[i].bookm=false;
      this.notification.success('Removed from your product bookmark ');
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
  
  
    this.feedService.postId = i;
    this.feedService.postadmin = admin;
    const dialogConfig = new MatDialogConfig();


      dialogConfig.width = '20%';
      this.dialog.open(FeedShareComponent, dialogConfig);
  }
}
