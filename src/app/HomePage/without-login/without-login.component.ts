import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { SignupComponent } from 'src/app/Auth/signup/signup.component';
import {FormGroup , FormControl} from '@angular/forms';
import { SearchService } from 'src/app/Service/search.service';
@Component({
  selector: 'app-without-login',
  templateUrl: './without-login.component.html',
  styleUrls: ['./without-login.component.css']
})
export class WithoutLoginComponent implements OnInit {

  constructor(public dialog: MatDialog , public searchService: SearchService) { }
  searchForm = new FormGroup({
     word: new FormControl(''),
     page: new FormControl('1')
  });
  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(SignupComponent, dialogConfig);
  }
onSearch() {
  const formData = this.searchForm.value;
  this.searchService.onSearch(formData).subscribe(res => {
      console.log(res);
  });
}
}
