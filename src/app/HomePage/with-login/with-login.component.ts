import { Component, OnInit, Inject } from '@angular/core';
<<<<<<< HEAD
import { UserService } from 'src/app/Service/user-services.service'
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';

=======
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
>>>>>>> 574328e48c267885a7df56bf1f3b661ac7913f27
@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {
<<<<<<< HEAD
username;
following;
bookmark;
counter;
  constructor(private userService:UserService,@Inject(LOCAL_STORAGE) public storage:WebStorageService,public homeService:HomepageService) { }
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
 
=======

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public router: Router) { }
  show = false;
  ngOnInit() {

  }
  onToggle() {
   this.show = !this.show;
   console.log(this.show);
>>>>>>> 574328e48c267885a7df56bf1f3b661ac7913f27
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

