import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService) { }

  ngOnInit() {
    const word = this.storage.get('query');
    this.search.onSearchFeed(word).subscribe(res => {
        console.log(res);
    });
  }

}
