import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { UserService } from 'src/app/Service/user-services.service';
@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService, private companyService:CompanyServiceService,private userService:UserService) { }
  panelOpenState = false;
  word;
  id;
  
  ngOnInit() {
    this.word = this.storage.get('query');
    this.userService.token=this.storage.get('token');
    const q=this.storage.get('query');
    this.search.onSearchCompany(q);
  }
   follow(){
     console.log(this.id);
    
   }

}
