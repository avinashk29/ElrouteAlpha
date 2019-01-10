import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
<<<<<<< HEAD
import {BookmarkServices} from '../../Service/bookmark-services.service';
=======
import { FeedService } from 'src/app/Service/feed-service.service';
>>>>>>> cab7eae895e644a895418c086f4fd7a2c7a51f6f
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

<<<<<<< HEAD
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,
   public bookmark: BookmarkServices) { }

  ngOnInit() {
    const word = this.storage.get('query');
    console.log(word);
    this.search.onSearchFeed(word);
    this.bookmark.token = this.storage.get('token');
    console.log(this.bookmark.token);
  }
  onBookmark(id) {
     this.bookmark.addPostBookmark(id);
=======
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,private feed:FeedService) { }
id
  ngOnInit() {
    const word = this.storage.get('query');
    this.search.onSearchFeed(word).subscribe(res => {
        console.log(res);
    });
console.log(this.storage.get('query'))
    // this.feed.GetFeed().subscribe(res=>{
    //   console.log(res);
    
    // });
  
>>>>>>> cab7eae895e644a895418c086f4fd7a2c7a51f6f
  }

}
