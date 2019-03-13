import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../../Service/search.service';
import { UserService } from 'src/app/Service/user-services.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { LoginComponent } from 'src/app/Auth/login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSearchbar = false;
  constructor(
    @Inject(LOCAL_STORAGE) public storage: WebStorageService,
    private router: Router,
    public searchService: SearchService,
    public UserService: UserService,
    public dialog: MatDialog,
  ) {}
  searchForm = new FormGroup({
    word: new FormControl(''),
    page: new FormControl('1')
  });
  ngOnInit() {
    // this.UserService.token = this.storage.get('token');
  }
  onSearch(event) {
    const formData = this.searchForm.value;
    if (event.keyCode === 13) {
      this.searchService.onSearch(
        this.searchForm.value.word,
        this.searchForm.value.page
      );
      this.searchService.searchValue = formData;
      this.router.navigate([
        '/Result/' +
          this.searchForm.value.word +
          '/' +
          this.searchForm.value.page
      ]);
    }
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

}
