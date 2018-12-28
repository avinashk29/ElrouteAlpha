import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { SignupComponent } from 'src/app/Auth/signup/signup.component';
@Component({
  selector: 'app-without-login',
  templateUrl: './without-login.component.html',
  styleUrls: ['./without-login.component.css']
})
export class WithoutLoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(SignupComponent, dialogConfig);
  }

}
