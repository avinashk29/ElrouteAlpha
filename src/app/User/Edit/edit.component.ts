import { Component, OnInit , Inject, inject} from '@angular/core';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import {UserService} from '../../Service/user-services.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { Router } from '@angular/router';
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
    userName : new FormControl(''),
    location : new FormControl(''),
    email: new FormControl(''),
    title: new FormControl (''),
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    twitter: new FormControl('')
  });

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public userService: UserService, public router: Router,public dialogRef: MatDialogRef<EditComponent>) { 
    
  }

  ngOnInit() {
    this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      this.username = JSON.parse(res['_body']).userName;
      this.location = JSON.parse(res['_body']).location;
      this.title = JSON.parse(res['_body']).title;
      this.email = JSON.parse(res['_body']).email;
      // this.facebook = JSON.parse(res['_body']).Facebook;
      // this.linkedin = JSON.parse(res['_body']).Linkedin;
      // this.twitter = JSON.parse(res['_body']).Twitter;
      this.user = JSON.parse(res['_body']);
      console.log(this.user);
      this.editForm.patchValue({
        UserName:JSON.parse(res['_body']).userName,
        Location:JSON.parse(res['_body']).location,
        Title:JSON.parse(res['_body']).title,
        Email:JSON.parse(res['_body']).email
      })
    });
   
  }
onEdit() {
 // console.log(this.editForm.value);
  const formData = this.editForm.value;
  this.userService.editUser(formData).subscribe(res => {
    console.log(JSON.parse(res['_body']));
   // console.log(this.editForm.value.Title);
     this.dialogRef.close(EditComponent);
     this.router.navigate(['/bookmark' ]); 
  });
}
}