import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import { Router,NavigationEnd } from '@angular/router';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedService } from '../../Service/feed-service.service';
import { CompanyServiceService } from '../../Service/company-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FeedComponent } from 'src/app/Post-feed/Feed/feed/feed.component';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { ProductServiceService } from '../../Service/product-service.service';
import{TradeCatalystComponent} from 'src/app/HomePage/trade-catalyst/trade-catalyst.component';
import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { FeedShareComponent } from 'src/app/Post-feed/feed-share/feed-share.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {
  companyName;
  haveCompany;
  file;
  imagePreview;
  feeds = [];
  noFeeds = true;
  addLink = false;
  feedImage;
  companyLogo;
  feed = new FormGroup({
    content: new FormControl('', [Validators.required]),
    Image: new FormControl('', [Validators.required]),
    tagId: new FormControl(),
    link: new FormControl(''),
  });
  resultvalue;
  result = [];
  pId;
  product = [];
  userFollow;
  companyFollowers;
  feedBookmark;
  url;
  allBookmarks=[];
  allFollow=[];
  loading;
  constructor(
    public userService: UserService,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService,
    public homeService: HomepageService,
    public router: Router,
    public authService: AuthServiceService,
    private followers: FollowService,
    public feedService: FeedService,
    public companyService: CompanyServiceService,
    public dialog: MatDialog,
    private imgupload: ImageUploadService,
    public productService: ProductServiceService,
    private imageService: ImageUploadService,
    public notification: ToastrService,
    private spinner: NgxSpinnerService,
    private bookmarkService:BookmarkServices
  ) {
    this.router.events.subscribe((event:NavigationEnd) =>{
      window.scrollTo(0,0);
    });
    }
  show = false;
  ngOnInit() {
    this.imgupload.token = this.storage.get("token");
    this.feedService.token = this.storage.get("token");
    this.followers.token=this.storage.get('token');
    this.bookmarkService.token=this.storage.get('token');
    this.haveCompany = this.storage.get("companyId");
    this.loading=true;
    this.feedService.getCompanyFeed().subscribe(res => {
      
      this.feeds = JSON.parse(res['_body']);
      
      
    
    });
      


      this.userService.getUserData().subscribe(res1 => {
        this.userService.userData = JSON.parse(res1['_body']);
        this.allBookmarks=JSON.parse(res1['_body']).bookmarks.post.length +
        JSON.parse(res1['_body']).bookmarks.product.length+JSON.parse(res1['_body']).bookmarks.company.length;
        this.allFollow=JSON.parse(res1['_body']).following.length;
        
        this.userService.bookmark =
        JSON.parse(res1['_body']).bookmarks.company.length + JSON.parse(res1['_body']).bookmarks.post.length
       + JSON.parse(res1['_body']).bookmarks.product.length + JSON.parse(res1['_body']).bookmarks.service.length;
        this.userService.following = JSON.parse(res1['_body']).following.length;
     
      
    
      this.loading=false;
      });
    
    if (this.haveCompany) {
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyFollowers=JSON.parse(res['_body']).followers.length;
        this.companyName=JSON.parse(res['_body']).companyName;
        this.companyLogo=JSON.parse(res['_body']).companyLogo;

      });
    }
  }
  feedImageLoading=false;
  uploadUserImage(event,name){
     this.file = <File>event.target.files[0];
 
     if(name === 'Image'){
      const reader =new FileReader();
      reader.onload=()=>{
        this.imagePreview=reader.result;
      };
      reader.readAsDataURL(this.file);
    }


     const fdata = new FormData();
      fdata.append(name,this.file);
      this.spinner.show();
     this.imageService.uploadImg(fdata).subscribe(image=>{
       const formdata=new FormData();
       this.url=image['_body'];
       formdata.append(name,this.url);
       if(name==='userImage'){
        this.userService.editUser(formdata).subscribe(res=>{
          this.userService.userData.userImage=JSON.parse(res['_body']).userImage;
          this.spinner.hide();
          });
       }
       else{
        this.feedImage=this.url;
        this.feedImageLoading=false;
        
          this.spinner.hide();
        
        
       }
      
     });
  }

  onAddpost() {
    this.addLink = false;
    this.feed.value.tagId = this.feedService.tagId;
      this.feed.value.Image = this.feedImage;
    
    if (this.feed.value.Image&&this.feed.value.content) {
      this.feedService.AddFeed(this.feed.value).subscribe(res => {
        
        this.feedService.getCompanyFeed().subscribe(feed => {
          
          this.feeds = JSON.parse(feed['_body']);
         

      });
    });
      this.feed.reset();
      this.feedImage=null;
      this.imagePreview=null;
      this.feedService.productName = null;
      this.feedService.productName = null;
      this.feedService.productDescription = null;
      this.notification.success('Post Added!');
    
   
    }
    
    else{
      this.notification.warning('Image or content is missing!');
  } 
  }
  closeTaggedProduct(){
    this.feedService.productName = null;
    this.feedService.productName = null;
    this.feedService.productDescription = null;
  }
  tagFeed() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(FeedComponent, dialogConfig);
  }
  EditBpage() {
    this.router.navigate(['/company-edit/basic-details']);
  }
  CreateBpage() {
    this.router.navigate(['/B-page']);
  }
  onfollow(i, id) {
    
    this.followers.addFollow(id).subscribe(res => {
      this.notification.success('Following')
      this.feeds[i].follow = true;
        this.userService.following +=1;
      

    });
  }
  onunfollow(i, id) {
    
    this.followers.Unfollow(id).subscribe(res => {
      
      this.feeds[i].follow = false;
        this.userService.following -=1; 
        this.notification.success('Unfollowed')
      
    });

  }
 addFeedBookmark(i, id) {
 // console.log(id)
    
    this.bookmarkService.addPostBookmark(id).subscribe(res => {
      this.feeds[i].bookm = true;  
        this.userService.bookmark +=1;  
    
      this.notification.success('Added to your feed bookmark');

    });
  }
  removeFeedbookmark(i, id) {
    
  // console.log(id)
    this.bookmarkService.DeletePostBookmark(id).subscribe(res => {
      this.feeds[i].bookm = false;
        this.userService.bookmark -=1;
      
        
      this.notification.success('Removed from your feed bookmark');

    });
  }
  onSharepost(i, admin) {
  // console.log(i);
  // console.log(admin);
    this.feedService.postId = i;
    this.feedService.postadmin = admin;
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;

      dialogConfig.width = '20%';
      this.dialog.open(FeedShareComponent, dialogConfig);
  }
  openTradeCatalyst(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(TradeCatalystComponent,dialogConfig);
  }
  goToLink(url: string){
    url = url.trim();
    if(url.indexOf('http')>-1){
      window.open(url, "_blank");
    }
   else{
    window.open('http://'+url, "_blank");
   }
  }
}
