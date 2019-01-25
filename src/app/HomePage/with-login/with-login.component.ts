import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../Auth/auth-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import {FormGroup , FormControl} from '@angular/forms';
import {FeedService} from '../../Service/feed-service.service';
import {CompanyServiceService} from '../../Service/company-service.service';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {
username;
following = [];
bookmark = [];
location;
companyName;
haveCompany;
subscription;
shortBio;
feeds = [];
noFeeds = true;

feed = new FormGroup({
  Content: new FormControl(''),
Image: new FormControl(' ')
});
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  public homeService: HomepageService, public router: Router, public authService: AuthServiceService, private followers: FollowService,
  public feedService: FeedService, public companyService: CompanyServiceService) {
    this.feedService.token = this.storage.get('token');
    // this.subscription = this.router.events.subscribe(() =>{
    //     this.feedService.Getpost().subscribe(res =>{
    //       console.log(res);
    //     })
    // });
    this.userService.token = this.storage.get('token');
    this.haveCompany = this.storage.get('companyId');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.username = JSON.parse(res['_body']).UserName;
      this.location = JSON.parse(res['_body']).Location;
      this.shortBio = JSON.parse(res['_body']).ShortBio;
    
    this.following = JSON.parse(res['_body']).Following.length;
    this.bookmark = JSON.parse(res['_body']).bookmarks.company.length + JSON.parse(res['_body']).bookmarks.post.length + JSON.parse(res['_body']).bookmarks.product.length + JSON.parse(res['_body']).bookmarks.service.length;
   });
   }
  show = false;
  ngOnInit() {
    // this.followers.token=this.storage.get('token');
    // this.followers.getFollowers().subscribe(res=>{
    //   console.log(res);
    // })
    this.feedService.Getpost().subscribe(res =>{
      console.log('Working');
      console.log(JSON.parse(res['_body']));
      this.feeds =  JSON.parse(res['_body']);
      if (!this.feeds.length){
        this.noFeeds = true;
      }
    });
    if (this.haveCompany){
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = (JSON.parse(res['_body']).companyName);
      });
    }
    
    }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.feed.patchValue({Image: file});
    this.feed.get('Image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        // this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
   }
  onAddpost() {
    this.feedService.token = this.storage.get('token');
    this.feedService.AddFeed(this.feed.value).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
    this.feed.reset();
  }
  onLogout() {
    this.storage.remove('token');
    this.storage.remove('companyId');
    this.router.navigate(['/']);
  }
// ngOnDestroy(){
//   this.subscription.unsubscribe();
// }
}


