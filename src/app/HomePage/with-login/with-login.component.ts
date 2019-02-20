import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import {Router,ActivatedRoute} from '@angular/router';
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
title;
userImage;
companyLogo;
feed = new FormGroup({
content: new FormControl(''),
Image: new FormControl(' '),
tagId: new FormControl(),
link: new FormControl(''),
productName: new FormControl(''),
productImage: new FormControl(),
productDescription: new FormControl('')
});
type
resultvalue
showSpinner
result=[]
pId
product=[];
productDescription;
productImage;
userFollow
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  public homeService: HomepageService, public router: Router, public authService: AuthServiceService, private followers: FollowService,
  public feedService: FeedService, public companyService: CompanyServiceService,
  public dialog: MatDialog,private imgupload:ImageUploadService, public productService: ProductServiceService,private route:ActivatedRoute ) {

    this.feedService.token = this.storage.get('token');
    this.subscription = this.router.events.subscribe(() =>{
      this.route.queryParams.filter(params=>params.urltype).subscribe(params=>{
        this.type=params.urltype;
        this.userService.getUserData().subscribe(res => {
          this.userImage=JSON.parse(res['_body']).userImage;
          console.log(this.userImage)
      })
      })
    this.userService.token = this.storage.get('token');
    this.haveCompany = this.storage.get('companyId');
    this.userService.getUserData().subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.username = JSON.parse(res['_body']).userName;
      this.location = JSON.parse(res['_body']).location;
      this.shortBio = JSON.parse(res['_body']).shortBio;
      this.userImage=JSON.parse(res['_body']).userImage;
      
      this.title=JSON.parse(res['_body']).title;
      this.following = JSON.parse(res['_body']).following.length;
      console.log(JSON.parse(res['_body']).following.length)
    this.bookmark = JSON.parse(res['_body']).bookmarks.company.length + JSON.parse(res['_body']).bookmarks.post.length + JSON.parse(res['_body']).bookmarks.product.length + JSON.parse(res['_body']).bookmarks.service.length;
  
  })
  });
  this.haveCompany = this.storage.get('companyId');
  console.log(this.haveCompany)
  this.productService.getProduct(this.haveCompany).subscribe(res=>{
    this.product=JSON.parse(res['_body']);
    console.log(this.product)
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
    this.feedService.getCompanyFeed().subscribe(res =>{
      console.log('Working');
      // console.log(JSON.parse(res['_body'])[0].admin);
      this.feeds =  JSON.parse(res['_body']);
      console.log(this.feeds)
      this.result=JSON.parse(res['_body'])[0];
    this.pId=JSON.parse(res['_body'])[0]._id;
    for (let i =0; i< JSON.parse(res['_body'])[0].length; i++){
      console.log(JSON.parse(res['_body'])[0][i].tagId)
      this.productService.getOneProduct(JSON.parse(res['_body'])[0][i].tagId).subscribe(res1 => {
        console.log(JSON.parse(res1['_body']))
      })
    }

      if (!this.feeds.length){
        this.noFeeds = true;
      }
      this.userService.getUserData().subscribe(res1=>{
        this.userFollow=JSON.parse(res1['_body']).following;
        console.log(this.userFollow)
        for(let i = 0; i < this.userFollow.length; i++) {
          console.log(this.userFollow[i]);
          for(let j = 0;j < this.result.length; j++) {
            console.log(this.result[j].admin);
               if(this.userFollow[i] == this.result[j].admin) {
                console.log(this.result[j].admin);
                this.resultvalue=false;
               } else  {
                console.log(this.result[j]._id);
                // this.result[j].follow=false;
               }
           }      
     }
      });
    });
    if (this.haveCompany){
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = (JSON.parse(res['_body']).companyName);
        this.companyLogo=(JSON.parse(res['_body']).companyLogo);
      

      });

     
    }

    

    }
    onImagePick(event,name) {
      console.log(name);
      this.router.navigate(['/Dashboard'], {queryParams: {urltype: 'upload'}});
      const file = <File>event.target.files[0];
      if (name === 'Image') {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
       };
       reader.readAsDataURL(file);
      }
      const fdata= new FormData();
      console.log(name)
      fdata.append(name,file)
        this.imgupload.uploadImg(fdata).subscribe(res=>{
           const fd=new FormData()
          this.feed.value.Image=res['_body']
          const url=res['_body']
           console.log(url)
           fd.append(name,url);
           console.log(url);

         this.userService.editUser(fd).subscribe(res=>{
           console.log(res);
          
         })
        })

     }
  
  onAddpost() {
    console.log(this.feed.value);
  this.feed.value.tagId = this.feedService.tagId;
   this.feed.value.productName=this.feedService.productName;
   this.feed.value.productImage=this.feedService.productImage;
   this.feed.value.productDescription=this.feedService.productDescription;
  this.feedService.AddFeed(this.feed.value).subscribe(res => {
    console.log(JSON.parse(res['_body']));
  });
    this.feed.reset();

  }
  tagFeed(){
    const dialogConfig = new MatDialogConfig( );
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(FeedComponent, dialogConfig);
  }
 
  EditBpage() {
    // console.log(this.mycompanyId)
    this.router.navigate(['/company-form2']);
  }
  CreateBpage(){
    this.router.navigate(['/B-page'])
  }

  onfollow(i,id){
     this.result[i].follow=false
    this.followers.addFollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working follow')
  }
  onunfollow(i,id){
    console.log(id)
    this.result[i].follow=true
    this.followers.Unfollow(id).subscribe(res=>{
               console.log(res);
           })
           console.log('i am working unfollow')
  }
ngOnDestroy(){
 this.subscription.unsubscribe();
}
}


