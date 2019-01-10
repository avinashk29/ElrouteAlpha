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
counter;
User;
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  public homeService: HomepageService, public router: Router) {
    if (!this.storage.get('token')) {
        this.router.navigate(['/']);
    }
    this.userService.token = this.storage.get('token');
  this.userService.getUserData();


   }
  show = false;
  ngOnInit() {
   this.User = this.userService.Data;
  console.log(this.User);
  }
  onLogout() {
    this.storage.remove('token');
    this.router.navigate(['/']);
  }
}


