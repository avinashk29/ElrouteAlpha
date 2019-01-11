import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  id;
  username;
  title;
  location;
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,private router:Router) {
    this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']));

      this.storage.set('Username' , JSON.parse(res['_body']).UserName);
      this.storage.set('title' , JSON.parse(res['_body']).Title);
      this.storage.set('location' , JSON.parse(res['_body']).Location);
    });
  }
  overviewResult;
  ngOnInit() {
this.username = this.storage.get('Username');
this.title = this.storage.get('title');
this.location = this.storage.get('location');
  }
  createBPage(){
    this.router.navigate(['/B-page'])
  }
}
