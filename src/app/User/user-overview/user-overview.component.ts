import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

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
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService) {
    this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.username = JSON.parse(res['_body']).UserName;
      this.location = JSON.parse(res['_body']).Location;
      this.title = JSON.parse(res['_body']).Title;
      console.log(this.username);
    });
  }
  overviewResult;
  ngOnInit() {
  }
}
