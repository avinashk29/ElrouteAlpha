import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  constructor() { }
followers = [{
   image: 'https://picsum.photos/200/300/?random',
   comapny: 'Xyz',
   name: 'Username',
   catogary: 'kuch bhi',
   country: 'India'
},
{
image: 'https://picsum.photos/200/300/?random',
comapny: 'Xyz',
name: 'Username',
catogary: 'kuch bhi',
country: 'India'
},
{
  image: 'https://picsum.photos/200/300/?random',
  comapny: 'Xyz',
  name: 'Username',
  catogary: 'kuch bhi',
  country: 'India'
  },
  {
    image: 'https://picsum.photos/200/300/?random',
    comapny: 'Xyz',
    name: 'Username',
    catogary: 'kuch bhi',
    country: 'India'
    }

];
  ngOnInit() {
  }

}
