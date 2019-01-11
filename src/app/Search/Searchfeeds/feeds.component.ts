import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import {BookmarkServices} from '../../Service/bookmark-services.service';
import { FowllowService } from 'src/app/Service/follow-service.service';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsSearchComponent implements OnInit {

  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService,
   public bookmark: BookmarkServices,public follows:FowllowService) { }

  ngOnInit() {
    const word = this.storage.get('query');
    console.log(word);
    this.search.onSearchFeed(word);
    this.bookmark.token = this.storage.get('token');
   // console.log(this.bookmark.token);
  }
  onBookmark(id) {
     this.bookmark.addPostBookmark(id);
  }
     follow(id)
     {
       this.follows.addFollow(id).subscribe(res=>{
         console.log(res);
       });
    }
}
