import { Component, OnInit , Inject} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login = new FormGroup({
  Email: new FormControl(''),
  Password: new FormControl('')
});
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, public authService: AuthServiceService) { }

  ngOnInit() {
  }
onSubmit() {
 const loginValues = this.login.value;
 this.authService.login(loginValues).subscribe(res => {
  console.log(JSON.parse(res['_body']));
  this.authService.token = this.storage.set('token', JSON.parse(res['_body']).UserName);
 });

}

}
