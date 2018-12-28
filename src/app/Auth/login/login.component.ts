import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthServiceService} from '../auth-service.service';
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
  constructor(public authService: AuthServiceService) { }

  ngOnInit() {
  }
onSubmit() {
 const loginValues = this.login.value;
 this.authService.login(loginValues).subscribe(res => {
  console.log(JSON.parse(res['_body']));
 });

}
}
