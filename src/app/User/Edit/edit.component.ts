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
    location : new FormControl('India'),
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
    this.userService.getUserData().subscribe(res => {
      this.editForm.patchValue( JSON.parse(res['_body']
      ));
    });

  }
onEdit() {

  const formData = this.editForm.value;
  this.userService.editUser(formData).subscribe(res => {
     this.userService.userData = JSON.parse(res['_body']);
     this.dialogRef.close(EditComponent);
  });

}
onClose(){
  this.dialogRef.close();
}
}
