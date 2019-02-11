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
  productId
  feedResult=[]
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,
   public bookmarkService: BookmarkServices, public follows: FollowService,private UserService:UserService, public route: ActivatedRoute) { }
word;
page;
  ngOnInit() {
    this.word = this.route.snapshot.paramMap.get('word');
    this.page = this.route.snapshot.paramMap.get('page');
    this.UserService.token=this.storage.get('token');
    this.bookmarkService.token = this.storage.get('token');
    console.log(this.word , this.page);
     this.UserService.getUserData().subscribe(res=>{
    this.userInfo=JSON.parse(res['_body']).bookmarks.post;
    console.log(this.userInfo.length);
    this.search.onSearchFeed(this.word , this.page).subscribe(res1=>{
      this.feedResult=JSON.parse(res1['_body']);
        console.log(this.feedResult)
        this.productId=JSON.parse(res1['_body']);
        for(let i = 0; i < this.userInfo.length; i++) {
          console.log(this.userInfo[i]);
          for(let j = 0;j < this.productId.length; j++) {
               if(this.productId[j]==null){

               }else{
                console.log(this.productId[j]._id);
                if(this.userInfo[i] == this.productId[j]._id) {
                 console.log(this.productId[j]._id);
                 this.productId[j].bookm=true;
                } else  {
                 // this.productId[j].bookm=true;
                 console.log(this.productId[j]._id);
                }
               }
           }      
     }
   
    });
  });
  }
 
  follow(id) {
      this.follows.addFollow(id).subscribe(res => {
        console.log(res);
      });
  }
  
    onBookmark(i,id) {
      this.productId[i].bookm=true;
      this.bookmarkService.addPostBookmark(id).subscribe(res => {
        console.log(res);
      });
      console.log(id);
   }
   OndeleteBookmark(i,id){
    this.productId[i].bookm=false;
    this.bookmarkService.DeletePostBookmark(id).subscribe(res => {
      console.log(res);
    });
   }
}
