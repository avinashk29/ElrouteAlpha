import { Component, OnInit,Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {


  constructor(public bookmarkService:BookmarkServices,@Inject(LOCAL_STORAGE) public storage:WebStorageService) { 


  }


  ngOnInit() {
  }

}
