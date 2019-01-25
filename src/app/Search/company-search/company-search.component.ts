import { Component, OnInit, Inject } from '@angular/core';
import {SearchService} from '../../Service/search.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { UserService } from 'src/app/Service/user-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from 'src/app/Service/follow-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { JAN } from '@angular/material';
@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,private bookmarkService:BookmarkServices, private router:Router,public search: SearchService,private companyService:CompanyServiceService,private userService:UserService,private route:ActivatedRoute,public follows:FollowService) { }
  panelOpenState = false;
  word;
  id;
  notlogin=true;
  unbookmarked = true;
  haveFollow=true;
  page;
  result= [];
  userInfo = [];
  companyfollow;
  companyId;
  ngOnInit() {
    this.userService.token = this.storage.get('token');
    this.follows.token = this.storage.get('token');
   this.word= this.route.snapshot.paramMap.get('word');
   this.page= this.route.snapshot.paramMap.get('page');
    this.userService.token=this.storage.get('token');
    this.follows.token=this.storage.get('token');
    this.companyId=this.storage.get('id');
    this.bookmarkService.token=this.storage.get('token');
    this.search.onSearchCompany(this.word).subscribe(res=>{
      this.result = JSON.parse(res['_body']);
      console.log(JSON.parse(res['_body'])[0]);
      this.companyfollow =JSON.parse(res['_body'])[0];
      
    });
    this.userService.getUserData().subscribe(res => {
      this.userInfo = JSON.parse(res['_body']).Following
      console.log(JSON.parse(res['_body']));

    })

  }
  onClick (id) { 
    console.log(this.userInfo.length);
    if (this.userInfo.length === 0){
      this.haveFollow=true;
    console.log(id)
    console.log('follow')
    this.follows.addFollow(id).subscribe(res=>{
      console.log(res);
    })
    }
  else{
    for (let i = 0; i<this.userInfo.length; i++) {
      if (id === this.userInfo[i]){
        this.haveFollow = false;
        console.log('unfollow')
        console.log(id)
        this.follows.Unfollow(id).subscribe(res=>{
          console.log(res);
        })
       }
       if (this.userInfo[i] != id) {
        this.haveFollow = true;
        console.log(id)
        console.log('follow')
        this.follows.addFollow(id).subscribe(res=>{
          console.log(res);
        })
       }
      }
  }
   
  }
 companyBookmark(id){
     this.bookmarkService.addCompanyBookmark(id).subscribe(res=>{
       console.log(res)
     });
 }
 GotoBpage(id){
   this.router.navigate(['/companyPage/'+this.id]);
 }
}
