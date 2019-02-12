import { Component, OnInit, Inject } from '@angular/core';
import { CompanyServiceService } from '../Service/company-service.service';
import { UserService } from '../Service/user-services.service';
import { Local } from 'protractor/built/driverProviders';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../Service/product-service.service';
import { FeedService } from '../Service/feed-service.service';
import { FollowService } from '../Service/follow-service.service';
import { BookmarkServices } from '../Service/bookmark-services.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  sectionEdit=false;
one = true;
two = false;
three = false;
four = false;
items;
 expand = [];
 token;
 userInfo=[];
groups;
CompanyName;
category;
city;
Follower
bookmark
file
uploadImages=false;
companyEmail;
 companyType ;
certification = [];
country;
 Image;
industry;
 mobile;
 address ;
  yearEstd;
  companySize;
companyFollowers=[]
website;
workingHours;
products = [];
comapnyId;
mycompanyId;
companyLogo;
type;
feeds = [];
subscription;
url;
logo=false;
infoImg=false;
img=false;
shortIntro;
shortbioEdit=false;
noFeeds = false;
myCompany = false;
editwebsite = false;
editworkingHours = false;
editshortIntro = false;
imagePreview;
infoImage;
section=[];
companyImage = [];
bioEdit=false;
userBookmark
follower

  constructor(private companyService:CompanyServiceService,private bookmarkService:BookmarkServices,private follows:FollowService,private feedService:FeedService,private productService:ProductServiceService,private route:ActivatedRoute,private router:Router,private userService:UserService,@Inject(LOCAL_STORAGE) private storage:WebStorageService) {
    this.companyService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');
    this.subscription = this.router.events.subscribe(() => {
      this.comapnyId = this.route.snapshot.paramMap.get('id');
      this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {
        this.type = paramas.urltype;
        this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
          console.log(JSON.parse(res['_body']))
          this.CompanyName = JSON.parse(res['_body']).companyName;
          this.category = JSON.parse(res['_body']).category;
          this.city = JSON.parse(res['_body']).city;
          this.companyEmail = JSON.parse(res['_body']).companyEmail;
          this.country = JSON.parse(res['_body']).country;
          this.industry = JSON.parse(res['_body']).industry;
          this.website = JSON.parse(res['_body']).website;
          this.workingHours = JSON.parse(res['_body']).workingHours;
          this.shortIntro = JSON.parse(res['_body']).shortIntro,
          this.yearEstd=JSON.parse(res['_body']).yearEstd;
          this.companyType=JSON.parse(res['_body']).companyType;
          this.address=JSON.parse(res['_body']).address;
          this.companySize=JSON.parse(res['_body']).companySize;
           this.Image=JSON.parse(res['_body']).coverImage;
           this.companyLogo=JSON.parse(res['_body']).companyLogo;
           this.infoImage=JSON.parse(res['_body']).infoImage;      
            this.section = JSON.parse(res['_body']).section;
           this.certification=JSON.parse(res['_body']).certification;
           this.companyImage = JSON.parse(res['_body']).companyImage;
          this.companyFollowers = JSON.parse(res['_body']).followers.length;
          if (this.comapnyId === this.mycompanyId) {
            this.myCompany = true;
          } else {
            this.myCompany = false;
          }

      if(this.companyLogo){
        this.logo=true;
      }
      if(this.infoImage){
        this.infoImg=true;
      }
      if(this.Image){
        this.img=true;
      }


        });
      });
      this.mycompanyId = this.storage.get('companyId');
      console.log(this.comapnyId+'companyId')
      if (this.type === 'product') {
        this.productService.getProduct(this.comapnyId).subscribe(res => {
            this.products = JSON.parse(res['_body']);
            // console.log(this.products[0].Image);
                });
        this.type = 'product';
        console.log(this.type);
      }
      if (this.type === 'info'){
        console.log(this.type);
        this.type = 'info';
      }
      if (this.type === 'contact'){
        console.log('info is working');
        this.type = 'contact  ';
        console.log(this.type);
      }
    });

  }

  ngOnInit() {
    // this.imgUpload.token=this.storage.get('token');
   this.feedService.token = this.storage.get('token');
   this.userService.getUserData().subscribe(res => {
     console.log(JSON.parse(res['_body']).following);
     this.userInfo = JSON.parse(res['_body']).following;
     for (let i = 0; i < this.userInfo.length; i++) {
       console.log(this.userInfo[i]);
       if (this.userInfo[i] === this.comapnyId) {
         this.Follower = true;
           console.log('You Have to unfollow the company right now');
       } else {
         console.log('You have to follow the company');
         this.Follower = false;
       }
     }
   });
   this.companyService.token = this.storage.get('token');
   this.productService.token = this.storage.get('token');
   this.mycompanyId = this.storage.get('companyId');
   this.token = this.storage.get('token')
   this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {

     this.type = paramas.urltype;

   });


 this.feedService.GetFeed(this.comapnyId).subscribe(res => {
   this.feeds =  JSON.parse(res['_body']);
   if (!this.feeds.length){
     this.noFeeds = true;
   }
   });
   //------------------------------------------bookmark at Bpage-------------------
      this.userService.getUserData().subscribe(res=>{
        this.userBookmark=JSON.parse(res['_body']).bookmarks.company;
        console.log(this.userBookmark);
      for(let i=0;i<this.userBookmark.length;i++){
        if(this.comapnyId==this.userBookmark[i])
        {
          this.bookmark=true;
        }else{
          this.bookmark=false;
        }
      }

      })
   
  }//end of Oninit
  showTwo() {
    this.router.navigate(['/Bface/' + this.comapnyId ], {queryParams: {urltype: 'info'}});
     this.type = 'info';
     console.log(this.type);
  }
  showThree() {
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      this.products = JSON.parse(res['_body']);
    });
    this.router.navigate(['/Bface/' + this.comapnyId ], {queryParams: {urltype: 'product'}});
     this.type = 'product';
    console.log(this.type);
  }
  showFour() {
    this.router.navigate(['/Bface/' + this.comapnyId ], {queryParams: {urltype: 'contact'}});
    this.type = 'contact';
    console.log(this.type);
  }
  onfollow() {
    this.Follower = true;
    this.follows.addFollow(this.comapnyId).subscribe(res => {
               console.log(res);
           });
           console.log('i am working follow')
  }
  onunfollow() {
    this.Follower =  false;
    this.follows.Unfollow(this.comapnyId).subscribe(res => {
               console.log(res);
           });
           console.log('i am working unfollow')
  }
  addBookmark(){
    this.bookmark=true;
    this.bookmarkService.addCompanyBookmark(this.comapnyId).subscribe(res=>{
      console.log(res);
    })
    console.log('Bookmark Done');
  }
  removeBookmark(){
    this.bookmark=false;
    this.bookmarkService.DeleteBookmarkCompany(this.comapnyId).subscribe(res=>{
      console.log(res);
    })
    console.log('Bookmar Removed')
  }

}