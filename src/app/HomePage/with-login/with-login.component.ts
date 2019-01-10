import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/Service/user-services.service'
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {
username;
following;
bookmark;
counter;
  constructor(private userService:UserService,@Inject(LOCAL_STORAGE) public storage:WebStorageService,public homeService:HomepageService, public router:Router) { }
  show = false;
  ngOnInit() {
    this.userService.token=this.storage.get('token');
  this.userService.getUserData().subscribe(res=>{
   this.storage.set('UserName',JSON.parse(res['_body']).UserName);
   this.storage.set('Following',JSON.parse(res['_body']).Following.company.length);
   this.storage.set('bookmarks',JSON.parse(res['_body']).bookmarks.product.length + JSON.parse(res['_body']).bookmarks.post.length +JSON.parse(res['_body']).bookmarks.service.length + JSON.parse(res['_body']).bookmarks.company.length);
   
   this.username=this.storage.get('UserName');
   this.following=this.storage.get('Following');
   this.bookmark=this.storage.get('bookmarks');
   console.log(this.username);
     console.log(this.following);
   console.log(this.bookmark);
   console.log(JSON.parse(res['_body']));
  });
 
  }
  onLogout() {
    this.storage.remove('token');
    this.router.navigate(['/']);
  }
}

  // onToggle() {
  //  this.show = !this.show;
  //  console.log(this.show);
  // }

