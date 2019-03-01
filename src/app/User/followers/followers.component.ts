import { Component, OnInit ,Inject} from '@angular/core';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import {LOCAL_STORAGE,WebStorageService} from 'angular-webstorage-service'


@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  constructor( private companyService:CompanyServiceService,@Inject(LOCAL_STORAGE) private storage:WebStorageService) { }
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
    // this.companyService.token=this.storage.get('token');
    this.companyService.getCompanyFollowers().subscribe(res=>{
      console.log(res);
    })
  }

}
