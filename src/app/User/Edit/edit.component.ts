import { Component, OnInit , Inject, inject, NgZone} from '@angular/core';
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
  editForm = new FormGroup({
    userName : new FormControl(''),
    location : new FormControl(''),
    email: new FormControl(''),
    title: new FormControl (''),
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    twitter: new FormControl('')
  });

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
  public userService: UserService, public router: Router,public dialogRef: MatDialogRef<EditComponent>, private ngZone: NgZone) {

  }

  ngOnInit() {
    this.userService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      this.editForm.patchValue({
        userName: JSON.parse(res['_body']).userName,
        location: JSON.parse(res['_body']).location,
        title: JSON.parse(res['_body']).title,
        email: JSON.parse(res['_body']).email
      });
    });

  }
onEdit() {

  const formData = this.editForm.value;

  this.userService.editUser(formData).subscribe(res => {

     this.router.navigate(['/bookmark' ], {queryParams: {edit: true}});
     this.dialogRef.close(EditComponent);
  });

  // this.router.navigate(['/bookmark' ]);
}
}