import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { SignupComponent } from 'src/app/Auth/signup/signup.component';
import {FormGroup , FormControl, Validators} from '@angular/forms';
import { SearchService } from 'src/app/Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-without-login',
  templateUrl: './without-login.component.html',
  styleUrls: ['./without-login.component.css']
})
export class WithoutLoginComponent implements OnInit {
  token;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public dialog: MatDialog , public searchService: SearchService, private router: Router) { }
  searchForm = new FormGroup({
     word: new FormControl(''),
     page: new FormControl('1')
  });
  ngOnInit() {
   this.token = this.storage.get('token');
    if (this.token) {
      this.router.navigate(['/Dashboard']);
      console.log(this.token);
   }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(SignupComponent, dialogConfig);
  }
onSearch(event) {
  if (event.keyCode === 13) {
    const formData = this.searchForm.value;
    this.searchService.onSearch(formData.word , formData.page);
    this.searchService.searchValue = formData;
    this.router.navigate(['/Result/' + formData.word + '/' + formData.page ]);
  }
}
}
