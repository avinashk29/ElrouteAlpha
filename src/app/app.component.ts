import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from './Service/user-services.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ElrouteAlpha';
  constructor(
    private userService: UserService,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService
    ){

  }
ngOnInit(){
  this.userService.token = this.storage.get('token');
  
  this.userService.getUserData().subscribe(res1 => {
    
    this.userService.location = JSON.parse(res1['_body']).location;
    this.userService.shortBio = JSON.parse(res1['_body']).shortBio;
    this.userService.userImage = JSON.parse(res1['_body']).userImage;
    this.userService.userName =JSON.parse(res1['_body']).userName;
  
    this.userService.title = JSON.parse(res1['_body']).title;
    this.userService.following = JSON.parse(res1['_body']).following.length;

    this.userService.bookmark = JSON.parse(res1['_body']).bookmarks.company.length + JSON.parse(res1['_body']).bookmarks.post.length
                    + JSON.parse(res1['_body']).bookmarks.product.length + JSON.parse(res1['_body']).bookmarks.service.length;
  });
}
}
