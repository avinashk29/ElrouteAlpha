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
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService) { }
  overviewResult;
  ngOnInit() {
  this.userService.token = this.storage.get('token');
  this.userService.getUserData();
  }
}
