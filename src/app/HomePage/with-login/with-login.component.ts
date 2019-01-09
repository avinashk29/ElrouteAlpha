import { Component, OnInit, Inject } from '@angular/core';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public router: Router) { }
  show = false;
  ngOnInit() {

  }
  onToggle() {
   this.show = !this.show;
   console.log(this.show);
  }
  onLogout() {
    this.storage.remove('token');
    this.router.navigate(['/']);
  }
}
