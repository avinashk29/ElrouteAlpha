import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import{Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchService} from '../../Service/search.service';
import { keyframes } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage:WebStorageService,private router:Router, public searchService: SearchService,private route:ActivatedRoute) { }
  searchForm = new FormGroup({
    word: new FormControl(''),
    page: new FormControl('1')
 });
  ngOnInit() {
  }
  onSearch(event) {
    const formData = this.searchForm.value;
    if(event.keyCode==13){
      this.storage.remove('query');
      this.searchService.onSearch(formData);
      this.searchService.searchValue = formData;
    this.storage.set('query', this.searchForm.value);
    this.router.navigate(['/Result']);
    }
    
  }
}
