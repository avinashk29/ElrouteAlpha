import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../Auth/auth-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import {FormGroup , FormControl} from '@angular/forms';
import {FeedService} from '../../Service/feed-service.service';
import {CompanyServiceService} from '../../Service/company-service.service';
import { Route } from '@angular/compiler/src/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { FeedComponent } from 'src/app/Post-feed/Feed/feed/feed.component';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import {ProductServiceService} from '../../Service/product-service.service';
@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit,OnDestroy {
username;
following = [];
bookmark = [];
location;
companyName;
haveCompany;
subscription;
shortBio;
imagePreview;
feeds = [];
noFeeds = true;
addLink = false;
image;
userImage;
companyLogo;
feed = new FormGroup({
content: new FormControl(''),
Image: new FormControl(' '),
tagId: new FormControl(),
link: new FormControl('')
});

  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  public homeService: HomepageService, public router: Router, public authService: AuthServiceService, private followers: FollowService,
  public feedService: FeedService, public companyService: CompanyServiceService,
  public dialog: MatDialog,private imgupload:ImageUploadService, public route: ActivatedRoute, public productService: ProductServiceService ) {


    this.feedService.token = this.storage.get('token');
    this.subscription = this.router.events.subscribe(() =>{
        // this.feedService.Getpost().subscribe(res =>{
        //   console.log(res);

        // })

    });
    this.userService.token = this.storage.get('token');
    this.haveCompany = this.storage.get('companyId');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.username = JSON.parse(res['_body']).userName;
      this.location = JSON.parse(res['_body']).location;
      this.shortBio = JSON.parse(res['_body']).shortBio;
      this.userImage=JSON.parse(res['_body']).userImage;
      this.following = JSON.parse(res['_body']).following.length;
      console.log(JSON.parse(res['_body']).following.length)
    this.bookmark = JSON.parse(res['_body']).bookmarks.company.length + JSON.parse(res['_body']).bookmarks.post.length + JSON.parse(res['_body']).bookmarks.product.length + JSON.parse(res['_body']).bookmarks.service.length;
   });
   }
  show = false;
  ngOnInit() {
    this.imgupload.token=this.storage.get('token')
     this.feedService.token = this.storage.get('token');
    // this.followers.token=this.storage.get('token');
    // this.followers.getFollowers().subscribe(res=>{
    //   console.log(res);
    // })
    // this.feedService.Getpost().subscribe(res =>{
    //   console.log('Working');
    //   console.log(JSON.parse(res['_body']));
    //   this.feeds =  JSON.parse(res['_body']);
    //   if (!this.feeds.length){
    //     this.noFeeds = true;
    //   }
    // });
    if (this.haveCompany){
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = (JSON.parse(res['_body']).companyName);
        this.companyLogo=(JSON.parse(res['_body']).companyLogo);

      });
    }


    }
    onImagePick(event,name) {
      console.log(name);

      const file = <File>event.target.files[0];
      if (name === 'Image') {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
       };
       reader.readAsDataURL(file);
      }

      const fdata= new FormData();
      fdata.append(name,file)
        this.imgupload.uploadImg(fdata).subscribe(res=>{
           const fd=new FormData()
          this.feed.value.Image=res['_body']
          const url=res['_body']
           console.log(url)
           fd.append('userImage',url);
           console.log(url);
         this.userService.editUser(fd).subscribe(res=>{
           console.log(res);
         })
        })


     }
  onAddpost() {
   this.feed.value.tagId = this.feedService.tagId;
   this.feed.value.companyName=this.companyName;
   this.feed.value.companyLogo=this.companyLogo
    this.feedService.AddFeed(this.feed.value).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
    this.feed.reset();

  }
  tagFeed(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(FeedComponent, dialogConfig);
  }
  onLogout() {
    this.storage.remove('token');
    this.storage.remove('companyId');
    this.router.navigate(['/']);
  }
ngOnDestroy(){
 this.subscription.unsubscribe();
}
}


