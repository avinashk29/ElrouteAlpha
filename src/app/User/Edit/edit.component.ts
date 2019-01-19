import { Component, OnInit , Inject, inject} from '@angular/core';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import {UserService} from '../../Service/user-services.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  username;
  location;
  title;
  email;
  facebook;
  linkedin;
  user;
  twitter;
  editForm = new FormGroup({
    UserName : new FormControl(''),
    Location : new FormControl(''),
    Email: new FormControl(''),
    Title: new FormControl (''),
    Facebook: new FormControl(''),
    Linkedin: new FormControl(''),
    Twitter: new FormControl('')
  });

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public userService: UserService) { }

  ngOnInit() {
    this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      this.username = JSON.parse(res['_body']).UserName;
      this.location = JSON.parse(res['_body']).Location;
      this.title = JSON.parse(res['_body']).Title;
      this.email = JSON.parse(res['_body']).Email;
      // this.facebook = JSON.parse(res['_body']).Facebook;
      // this.linkedin = JSON.parse(res['_body']).Linkedin;
      // this.twitter = JSON.parse(res['_body']).Twitter;
      this.user = JSON.parse(res['_body']);
      console.log(this.user);
    });
  }
onEdit() {
  this.editForm.patchValue({
    UserName : this.editForm.value.UserName,
    Location : this.editForm.value.Location,
    Email: this.editForm.value.Email,
    Title: this.editForm.value.Title,
    // Facebook: new FormControl(''),
    // Linkedin: new FormControl(''),
    // Twitter: new FormControl('')
  });
  console.log(this.editForm.value);
  this.userService.editUser(this.editForm.value).subscribe(res => {
    console.log(JSON.parse(res['_body']));
    console.log(this.editForm.value.Title);
  });
}
}
