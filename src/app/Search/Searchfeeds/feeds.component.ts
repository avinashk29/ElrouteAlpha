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
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,
   public bookmarkService: BookmarkServices, public follows: FollowService,private UserService:UserService, public route: ActivatedRoute) { }
word;
page;
  ngOnInit() {
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
    console.log(this.word , this.page);
  this.UserService.getUserData().subscribe(res=>{
    this.userInfo=JSON.parse(res['_body'])
  })
    this.search.onSearchFeed(this.word , this.page).subscribe(res=>{
      console.log(res);
    })
    this.bookmarkService.token = this.storage.get('token');
    console.log(this.bookmarkService.token);

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

    onBookmark(id) {
      this.bookmarkService.addPostBookmark(id).subscribe(res => {
        console.log(res);
      });
      console.log(id);
   }
   OndeleteBookmark(){

   }
}
