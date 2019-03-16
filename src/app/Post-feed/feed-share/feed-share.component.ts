import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from 'src/app/Service/feed-service.service';
@Component({
  selector: 'app-feed-share',
  templateUrl: './feed-share.component.html',
  styleUrls: ['./feed-share.component.css']
})
export class FeedShareComponent implements OnInit {
url = `https://elroute.com/companyPage/${this.feedService.postadmin+'?urltype=default#'+this.feedService.postId}`;
text = `test is working`;
imageUrl = 'http://jasonwatmore.com/_content/images/jason.jpg';
  constructor(private router: Router, public feedService: FeedService) {
// this.router.navigate(['/companyPage' + this.feedService.postadmin], {queryParams: {urltype: 'default'}});
   }

  ngOnInit() {
  }

}
