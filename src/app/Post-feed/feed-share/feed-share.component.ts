import { Component, OnInit } from '@angular/core';
import {
  SocialService
} from 'ng6-social-button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feed-share',
  templateUrl: './feed-share.component.html',
  styleUrls: ['./feed-share.component.css']
})
export class FeedShareComponent implements OnInit {
  shareObj = {
    href: `https://elroute.com/${this.router.url}`,
    hashtag: null,

    // imagehref: 'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg'
};
test;
  constructor(private router: Router) {
    console.log('https://elroute.com/' + this.router.url);

   }

  ngOnInit() {
  }

}
