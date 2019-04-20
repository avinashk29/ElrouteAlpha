import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from 'src/app/Service/feed-service.service';
import { MatDialog,  MatDialogRef } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
// import { url } from 'inspector';
@Component({
  selector: 'app-feed-share',
  templateUrl: './feed-share.component.html',
  styleUrls: ['./feed-share.component.css']
})
export class FeedShareComponent implements OnInit {
url ;
text;
imageUrl ;
  constructor(private router: Router, public feedService: FeedService ,public dialog: MatDialog,   public dialogRef: MatDialogRef<FeedShareComponent>,
    public meta: Meta, public title: Title
    
    ) {
// this.router.navigate(['/companyPage' + this.feedService.postadmin], {queryParams: {urltype: 'default'}});
   }

  ngOnInit() {
    this.url = `https://elroute.com/companyPage/${this.feedService.postadmin+'?urltype=default#'+this.feedService.postImage+this.feedService.postId}`;
this.text = this.feedService.feedContent;
this.imageUrl = this.feedService.postImage;
    console.log(this.feedService.feedContent)
    this.meta.updateTag({ property: 'og:description', content: this.feedService.feedContent }); 
    this.meta.updateTag({ property: 'og:image', content: this.feedService.postImage }); 
    this.meta.updateTag({ property: 'og:title', content: this.feedService.postadmin });
    this.meta.updateTag({ property: 'og:url', content: this.url }); 
    
// this.title.setTitle('arjun ki company');
  }
  onClose(){
    this.dialogRef.close();
  }

}
