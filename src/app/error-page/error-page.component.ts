import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
token
  constructor( @Inject(LOCAL_STORAGE) private storage: WebStorageService,) { }

  ngOnInit() {
    this.token=this.storage.get('token');
  }

}
