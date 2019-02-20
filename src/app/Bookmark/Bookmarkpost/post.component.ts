import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public bookmarkService: BookmarkServices, @Inject(LOCAL_STORAGE) public storage: WebStorageService,private route:ActivatedRoute) { }
post=[];
  ngOnInit() {
   //this.companyId= this.route.snapshot.paramMap.get('id')
    this.bookmarkService.token = this.storage.get('token');
    this.bookmarkService.getBookmarkPost().subscribe(res => {
      this.post=JSON.parse(res['_body']);
      console.log(res);
    });
    
  }

}
