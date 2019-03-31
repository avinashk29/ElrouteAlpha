import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
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
  companyId;
  constructor(
    @Inject(LOCAL_STORAGE) public storage: WebStorageService,
    private router: Router,
    public searchService: SearchService,
    public UserService: UserService,
    public dialog: MatDialog,
    private route:ActivatedRoute
  ) {}
  searchForm = new FormGroup({
    word: new FormControl(''),
    page: new FormControl('1')
  });
  ngOnInit() {
    // this.UserService.token = this.storage.get('token');
        this.companyId = this.storage.get('companyId');
        this.UserService.getUserData().subscribe(res=>{
          this.UserService.userData = JSON.parse(res['_body']);
          // console.log(res)
        })

  }
  onSearch(event) {
    const formData = this.searchForm.value;
    if (event.keyCode === 13) {
      this.searchService.onSearch(
        this.searchForm.value.word,
        this.searchForm.value.page
      );
      this.searchService.searchValue = formData;
      // // console.log(this.router.url)
      var path = this.router.url;
      var paths = path.split('/');
      // // console.log(paths)
      // if(paths[0].toLocale)
      if(paths[1].indexOf('result')>-1){
        this.router.navigate([
          '/'+paths[1]+'/' +
            this.searchForm.value.word +
            '/' +
            this.searchForm.value.page
        ]);
      }
      else{
        // console.log(this.searchForm.value.word)
        this.searchService.maxResult( this.searchForm.value.word).subscribe(res=>{
         var searchPath = res['_body'];
        //  // console.log(searchPath);
          this.router.navigate([
            '/'+searchPath+'/' +
              this.searchForm.value.word +
              '/' +
              this.searchForm.value.page
          ]);
        })
     
    }
    }
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  onLogout() {
    if (confirm('Are you sure you want to logout')) {
      this.router.navigate(['/']);
      this.storage.remove('token');
      this.storage.remove('companyId');
      this.UserService.userData = " ";
      // // console.log(this.UserService.userData )
    
    }
  }
}
