import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import {BookmarkServices} from '../../Service/bookmark-services.service';
import {FollowService} from 'src/app/Service/follow-service.service';
import {ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/Service/user-services.service';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsSearchComponent implements OnInit {

  userInfo=[]
  feedResult=[]
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,
   public bookmarkService: BookmarkServices, public follows: FollowService,private UserService:UserService, public route: ActivatedRoute) { }
word;
page;
  ngOnInit() {
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
    console.log(this.word , this.page);
  this.UserService.getUserData().subscribe(res=>{
    this.userInfo=JSON.parse(res['_body']).bookmarks.post;
    console.log(this.userInfo);
    this.search.onSearchFeed(this.word , this.page).subscribe(res=>{
      this.feedResult=JSON.parse(res['_body']);

      /////////////////////
      this.bookmarkService.feedBookmark=JSON.parse(res['_body'])[0];
      for (let i=0; i<this.bookmarkService.feedBookmark.length; i++) {
        console.log(this.userInfo.length);
        if (this.userInfo.length === 0){
          this.bookmarkService.feedBookmark[i].bookm = false;
          console.log(this.bookmarkService.feedBookmark[i])
        }else{
          console.log(this.bookmarkService.feedBookmark[i]._id);
        console.log( this.userInfo[i]);
        if (this.bookmarkService.feedBookmark[i]._id === this.userInfo[i]){
          this.bookmarkService.feedBookmark[i].bookm = true;
          console.log(this.bookmarkService.feedBookmark[i].bookm)
        }
        }
        
      }
    })
    this.bookmarkService.token = this.storage.get('token');
    console.log(this.bookmarkService.token);
  })
  }
 
  follow(id) {
      this.follows.addFollow(id).subscribe(res => {
        console.log(res);
      });
  }
    //  follow(id)
    //  {
    //    this.follows.addFollow(id).subscribe(res=>{
    //      console.log(res);
    //    });
    // }

    onBookmark(i,id) {
      this.bookmarkService.feedBookmark[i].bookm=true;
      this.bookmarkService.addPostBookmark(id).subscribe(res => {
        console.log(res);
      });
      console.log(id);
   }
   OndeleteBookmark(i,id){
    this.bookmarkService.feedBookmark[i].bookm=false;
    this.bookmarkService.DeletePostBookmark(id).subscribe(res => {
      console.log(res);
    });
   }
}
