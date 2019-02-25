import { Component, OnInit, Inject } from '@angular/core';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(public bookmarkService: BookmarkServices, @Inject(LOCAL_STORAGE) public storage: WebStorageService) { }
result=[]
  ngOnInit() {
    this.bookmarkService.token = this.storage.get('token');
    this.bookmarkService.getBookmarkCompany().subscribe(res => {
         console.log(res)
         this.result=JSON.parse(res['_body']);
    });
  }

}
