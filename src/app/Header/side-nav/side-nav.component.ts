import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../../Service/user-services.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public userService: UserService) { }
toggle = false;
companyId;
haveCompany = false;
  ngOnInit() {
    // this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      this.companyId = JSON.parse(res['_body']).Company_id;
      if (this.companyId) {
        this.haveCompany = true;
      }

    });
  }
  onToggle() {
this.toggle = !this.toggle;
  }
}
