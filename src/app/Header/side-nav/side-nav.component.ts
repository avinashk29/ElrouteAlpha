import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../../Service/user-services.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
declare var $ :any;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public userService: UserService,    private router: Router) {
    this.companyId = this.storage.get('companyId');
  }
toggle = false;
companyId;
haveCompany = false;
  ngOnInit() {
  
  }
  onToggle() {
this.toggle = !this.toggle;
  }
  onLogout() {
    this.router.navigate(['/']);
    this.storage.remove('token');
    this.storage.remove('companyId');


  }
}
