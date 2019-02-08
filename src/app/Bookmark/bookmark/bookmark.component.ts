import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  product=[]
  constructor(public bookmarkService:BookmarkServices,@Inject(LOCAL_STORAGE) public storage:WebStorageService) { 

    this.bookmarkService.token = this.storage.get('token');
    this.bookmarkService.getBookmarkProduct().subscribe(res => {
    this.product=JSON.parse(res['_body']);
      console.log(this.product)
    });

  }


  ngOnInit() {
   
  }



}
