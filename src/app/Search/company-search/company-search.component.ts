import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { UserService } from 'src/app/Service/user-services.service';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from 'src/app/Service/follow-service.service';
@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public search: SearchService, private follows:FollowService, private companyService:CompanyServiceService,private userService:UserService,private route:ActivatedRoute) { }
  panelOpenState = false;
  word;
  id;
  page;
  result= [];
  ngOnInit() {
   this.word= this.route.snapshot.paramMap.get('word');
   this.page= this.route.snapshot.paramMap.get('page');
    this.userService.token=this.storage.get('token');
    this.search.onSearchCompany(this.word).subscribe(res=>{
      this.result = JSON.parse(res['_body']);
      console.log(this.result);
    });
  }
   follow(id){
     this.follows.token=this.storage.get('token');
     this.follows.addFollow(id).subscribe(res=>{
       console.log(res);
    
     })
    
   }

}
