import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../Auth/auth-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {
username;
following;
bookmark;
location;
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  public homeService: HomepageService, public router: Router, public authService: AuthServiceService,private followers:FollowService) {
    this.userService.token = this.storage.get('token');
   this.userService.getUserData().subscribe(res => {
     console.log(JSON.parse(res['_body']));
     this.username = JSON.parse(res['_body']).UserName;
     this.following = JSON.parse(res['_body']).Following.company.length;
     this.bookmark = JSON.parse(res['_body']).bookmarks.company.length + JSON.parse(res['_body']).bookmarks.post.length +
     JSON.parse(res['_body']).bookmarks.product.length +
     JSON.parse(res['_body']).bookmarks.service.length;
   });


   }
  show = false;
  ngOnInit() {
    this.followers.token=this.storage.get('token');
    this.followers.getFollowers().subscribe(res=>{
      console.log(res);
    })
  }
  onLogout() {
    this.storage.remove('token');
    this.router.navigate(['/']);
  }
}


