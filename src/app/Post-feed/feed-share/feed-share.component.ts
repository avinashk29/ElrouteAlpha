import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from 'src/app/Service/feed-service.service';
import { MatDialog,  MatDialogRef } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-feed-share',
  templateUrl: './feed-share.component.html',
  styleUrls: ['./feed-share.component.css']
})
export class FeedShareComponent implements OnInit {
url = `https://elroute.com/companyPage/${this.feedService.postadmin+'?urltype=default#'+this.feedService.postImage+this.feedService.postId}`;
text = this.feedService.feedContent;
imageUrl = this.feedService.postImage;
  constructor(private router: Router, public feedService: FeedService ,public dialog: MatDialog,   public dialogRef: MatDialogRef<FeedShareComponent>,
    public meta: Meta, public title: Title
    
    ) {
// this.router.navigate(['/companyPage' + this.feedService.postadmin], {queryParams: {urltype: 'default'}});
   }

  ngOnInit() {
    this.meta.updateTag({ property: 'og:description', content: 'hello from otherside' }); 
this.title.setTitle('arjun ki company');
  }
  onClose(){
    this.dialogRef.close();
  }

}
