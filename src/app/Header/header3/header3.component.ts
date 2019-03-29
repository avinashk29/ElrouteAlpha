import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/Service/search.service';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.css']
})
export class Header3Component implements OnInit {

  constructor(public searchService: SearchService) { }

  ngOnInit() {
    console.log(this.searchService.feedResultLength);
  }

}
