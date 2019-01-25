import { Component, OnInit,Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  

  followings=[];
  companyBookmark;
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService,private following:FollowService,private bookmarkService:BookmarkServices) { 
  //   this.followings = [
	// 		{
	// 			Company_name: "Comapny Name",
  //      location: "India",
  //      industry: "Industry",
  //      follwers_nub:"21,000",
  //      Following:"Following",
  //     },
  //     {
	// 			Company_name: "Comapny Name",
  //      location: "India",
  //      industry: "Industry",
  //      follwers_nub:"21,000",
  //      Following:"Following",
  //     },
  //     {
	// 			Company_name: "Comapny Name",
  //      location: "India",
  //      industry: "Industry",
  //      follwers_nub:"21,000",
  //      Following:"Following",
  //     },
  //     {
	// 			Company_name: "Comapny Name",
  //      location: "India",
  //      industry: "Industry",
  //      follwers_nub:"21,000",
  //      Following:"Following",
  //     },
  //     {
	// 			Company_name: "Comapny Name",
  //      location: "India",
  //      industry: "Industry",
  //      follwers_nub:"21,000",
  //      Following:"Following",
  //     },
  //     {
	// 			Company_name: "Comapny Name",
  //      location: "India",
  //      industry: "Industry",
  //      follwers_nub:"21,000",
  //      Following:"Following",
  //     },
	// 	];

   }

  ngOnInit() {
    this.following.token=this.storage.get('token');
    this.bookmarkService.token=this.storage.get('token');
        this.following.getFollowing().subscribe(res=>{
      this.followings=JSON.parse(res['_body']);
    })
   this.bookmarkService.getBookmarkCompany().subscribe(res=>{
    this.companyBookmark=JSON.parse(res['_body']).length;
   })

  }


}
