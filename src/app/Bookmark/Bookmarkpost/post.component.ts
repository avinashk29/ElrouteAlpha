import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public bookmarkService: BookmarkServices, @Inject(LOCAL_STORAGE) public storage: WebStorageService) { }

  ngOnInit() {
    this.bookmarkService.token = this.storage.get('token');
    this.bookmarkService.getBookmarkPost().subscribe(res => {
      console.log(res);
    });
  }

}
