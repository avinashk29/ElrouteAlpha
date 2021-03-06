import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  loading

  constructor(public bookmarkService: BookmarkServices, @Inject(LOCAL_STORAGE) public storage: WebStorageService,private route:ActivatedRoute) {     this.loading=true;}
post=[];
  ngOnInit() {
    this.bookmarkService.token = this.storage.get('token');
    this.bookmarkService.getBookmarkPost().subscribe(res => {
      this.post=JSON.parse(res['_body']);
    console.log(JSON.parse(res['_body']))
      this.loading=false;
    });
    
  }
onUnbookmark(id){
  if (confirm('Are you sure you want to unbookmark the feed?')){
// console.log(id);
  this.bookmarkService.DeletePostBookmark(id).subscribe(res => {
    this.bookmarkService.getBookmarkPost().subscribe(res => {
      this.post=JSON.parse(res['_body']);
      // console.log(JSON.parse(res['_body']))
    });
  })
}
}
goToLink(url: string){
  url = url.trim();
  if(url.indexOf('http')>-1){
    window.open(url, "_blank");
  }
 else{
  window.open('http://'+url, "_blank");
 }
}
}
