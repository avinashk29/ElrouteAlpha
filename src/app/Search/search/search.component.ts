import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { AuthServiceService } from 'src/app/Auth/auth-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import {LoginComponent} from '../../Auth/login/login.component';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
show = false;
results = [];
notlogin = true;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
 public search: SearchService, private bookmarksService: BookmarkServices, public authService: AuthServiceService,
 public dialog: MatDialog
 ) {

  }
  ngOnInit() {
    this.bookmarksService.token = this.storage.get('token');
    console.log(this.bookmarksService.token);
    const formData = this.storage.get('query');
   this.search.onSearch(formData);
    console.log(this.search.searchValue);
    if (this.authService.token != null) {
      this.notlogin = false;
    }
    console.log(this.authService.token);
  }

bookmark(id) {
console.log(id);
this.bookmarksService.addProductBookmarks(id).subscribe(res => {
  console.log(res);
})
}
openLogin() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  this.dialog.open(LoginComponent, dialogConfig);
}
serviceBookmark(id) {
this.bookmarksService.addServiceBookmark(id).subscribe(res => {
  console.log(res);
})
}
}
