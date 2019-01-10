import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import {Router} from '@angular/router';
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
  public homeService: HomepageService, public router: Router) {
    if (!this.storage.get('token')) {
        this.router.navigate(['/']);
    }
    this.userService.token = this.storage.get('token');
  this.userService.getUserData().subscribe(res => {
    console.log(JSON.parse(res['_body']));

    this.storage.set('Username' , JSON.parse(res['_body']).UserName);
    this.storage.set('Following' , JSON.parse(res['_body']).Following.company.length);
    this.storage.set('Bookmark' , JSON.parse(res['_body']).bookmarks.post.length + JSON.parse(res['_body']).bookmarks.product.length + JSON.parse(res['_body']).bookmarks.company.length + JSON.parse(res['_body']).bookmarks.service.length);
    this.storage.set('location' , JSON.parse(res['_body']).Location);
  });


   }
  show = false;
  ngOnInit() {

    this.username = this.storage.get('Username');
    this.following = this.storage.get('Following');
    this.bookmark = this.storage.get('Bookmark');
    this.location = this.storage.get('location');
  }
  onLogout() {
    this.storage.remove('token');
     this.storage.remove('Username');
    this.storage.remove('Following');
     this.storage.remove('Bookmark');
     this.storage.remove('location');
     this.storage.remove('title');
    this.router.navigate(['/']);
  }
}


