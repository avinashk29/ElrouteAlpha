import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import { Router,NavigationEnd } from '@angular/router';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FeedService } from '../../Service/feed-service.service';
import { CompanyServiceService } from '../../Service/company-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FeedComponent } from 'src/app/Post-feed/Feed/feed/feed.component';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { ProductServiceService } from '../../Service/product-service.service';

import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
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
    content: new FormControl(''),
    Image: new FormControl(''),
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
  allFollow=[]
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
    private spinner:Ng4LoadingSpinnerService,
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
    this.feedService.getCompanyFeed().subscribe(res => {
      console.log(JSON.parse(res['_body']))
      this.feeds = JSON.parse(res['_body']);
      this.result = JSON.parse(res['_body']);
      if (this.result) {
        this.pId = JSON.parse(res['_body'])[0]._id;
        for (let i = 0; i < JSON.parse(res['_body'])[0].length; i++) {
          this.productService
            .getOneProduct(JSON.parse(res['_body'])[0][i].tagId)
            .subscribe(res1 => {});
        }
      }
    
      this.userService.getUserData().subscribe(res1 => {
        // this.allBookmarks=JSON.parse(res1['_body']).bookmarks.post.length + JSON.parse(res1['_body']).bookmarks.product.length+JSON.parse(res1['_body']).bookmarks.company.length;
        this.allFollow=JSON.parse(res1['_body']).following.length;
        // console.log(this.allFollow);
        this.feedBookmark=JSON.parse(res1['_body']).bookmarks.post;
        this.userFollow = JSON.parse(res1["_body"]).following;
        for (let i = 0; i < this.userFollow.length; i++) {
          for (let j = 0; j < this.result.length; j++) {
            if (this.userFollow[i] === this.result[j].admin) {
              this.result[i].follow=true;
            } else {
            }
          }
        }
      //----------------------feedBookmark----------------/
      for (let i = 0; i < this.feedBookmark.length; i++) {
        for (let j = 0; j < this.result.length; j++) {
          if (this.feedBookmark[i] === this.result[j]._id) {
            this.result[i].bookm=true;
          } else {
          }
        }
      }
      });
    });
    if (this.haveCompany) {
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyFollowers=JSON.parse(res['_body']).followers.length;
        this.companyName=JSON.parse(res['_body']).companyName;
        this.companyLogo=JSON.parse(res['_body']).companyLogo;

      });
    }
  }
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
     this.imageService.uploadImg(fdata).subscribe(res=>{
       const formdata=new FormData();
       this.url=res['_body'];
       formdata.append(name,this.url);
       if(name==='userImage'){
        this.userService.editUser(formdata).subscribe(res=>{
          this.userService.userData.userImage=JSON.parse(res['_body']).userImage;
          // this.spinner.hide();
          });
       }else{
        this.feedImage=this.url;
        // this.spinner.hide();
       }
       this.spinner.hide();
     })
  }

  onAddpost() {
    this.addLink = false;
    this.feed.value.tagId = this.feedService.tagId;
      this.feed.value.Image = this.feedImage;
    if (!this.url) {
        this.notification.warning('Please Add Image!');
    } else {
      this.feedService.AddFeed(this.feed.value).subscribe(res => {
        console.log(res)
      });
      this.feed.reset();
      this.imagePreview=null;
      this.feedService.productName = null;
      this.feedService.productName = null;
      this.feedService.productDescription = null;
      this.notification.success('Post Added!');
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
    this.router.navigate(['/company-form2']);
  }
  CreateBpage() {
    this.router.navigate(['/B-page']);
  }
  onfollow(i, id) {
    this.result[i].follow = true;
    this.followers.addFollow(id).subscribe(res => {});
  }
  onunfollow(i, id) {
    this.result[i].follow = false;
    this.followers.Unfollow(id).subscribe(res => {});
  }
 addFeedBookmark(i, id) {
    this.result[i].bookm = true;
    this.bookmarkService.addPostBookmark(id).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
  }
  removeFeedbookmark(i, id) {
    this.result[i].bookm = false;
    this.bookmarkService.DeletePostBookmark(id).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
  }
}
