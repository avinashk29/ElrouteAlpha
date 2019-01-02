import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  

  followings;
  constructor() { 
    this.followings = [
			{
				Company_name: "Comapny Name",
       location: "India",
       industry: "Industry",
       follwers_nub:"21,000",
       Following:"Following",
      },
      {
				Company_name: "Comapny Name",
       location: "India",
       industry: "Industry",
       follwers_nub:"21,000",
       Following:"Following",
      },
      {
				Company_name: "Comapny Name",
       location: "India",
       industry: "Industry",
       follwers_nub:"21,000",
       Following:"Following",
      },
      {
				Company_name: "Comapny Name",
       location: "India",
       industry: "Industry",
       follwers_nub:"21,000",
       Following:"Following",
      },
      {
				Company_name: "Comapny Name",
       location: "India",
       industry: "Industry",
       follwers_nub:"21,000",
       Following:"Following",
      },
      {
				Company_name: "Comapny Name",
       location: "India",
       industry: "Industry",
       follwers_nub:"21,000",
       Following:"Following",
      },
      
		];

  }

  ngOnInit() {
  }

}
