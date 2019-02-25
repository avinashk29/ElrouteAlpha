import { Component, OnInit, Inject} from '@angular/core';
import { UserService } from '../../Service/user-services.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HomepageService } from '../homepage.service';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../Auth/auth-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import {FormGroup , FormControl} from '@angular/forms';
import {FeedService} from '../../Service/feed-service.service';
import {CompanyServiceService} from '../../Service/company-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { FeedComponent } from 'src/app/Post-feed/Feed/feed/feed.component';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import {ProductServiceService} from '../../Service/product-service.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {
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
type;
resultvalue;
showSpinner;
result = [];
pId;
product = [];
productDescription;
productImage;
userFollow;
  constructor(private userService: UserService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  public homeService: HomepageService, public router: Router, public authService: AuthServiceService, private followers: FollowService,
  public feedService: FeedService, public companyService: CompanyServiceService,
  public dialog: MatDialog,private imgupload:ImageUploadService, public productService: ProductServiceService
  , public notification: ToastrService) {


   }
  show = false;
  ngOnInit() {
    this.imgupload.token = this.storage.get('token')
    this.feedService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');
    this.haveCompany = this.storage.get('companyId');
    this.haveCompany = this.storage.get('companyId');
    console.log(this.haveCompany);
    this.feedService.getCompanyFeed().subscribe(res => {
      this.feeds = JSON.parse(res['_body']);
      this.result = JSON.parse(res['_body'])[0];
      if (this.result) {
        this.pId = JSON.parse(res['_body'])[0]._id;
        for (let i = 0; i < JSON.parse(res['_body'])[0].length; i++) {
          this.productService.getOneProduct(JSON.parse(res['_body'])[0][i].tagId).subscribe(res1 => {
          })
        }
      }
      if (!this.feeds.length) {
        this.noFeeds = true;
      }
      this.userService.getUserData().subscribe(res1 => {
        // this.userService.user = JSON.parse(res1['_body']);
        
        // this.userService.location = JSON.parse(res1['_body']).location;
        // this.userService.shortBio = JSON.parse(res1['_body']).shortBio;
        // this.userService.userImage = JSON.parse(res1['_body']).userImage;
        // this.userService.userName =JSON.parse(res1['_body']).userName;
      
        // this.userService.title = JSON.parse(res1['_body']).title;
        // this.userService.following = JSON.parse(res1['_body']).following.length;

        // this.userService.bookmark = JSON.parse(res1['_body']).bookmarks.company.length + JSON.parse(res1['_body']).bookmarks.post.length
        //                 + JSON.parse(res1['_body']).bookmarks.product.length + JSON.parse(res1['_body']).bookmarks.service.length;
        this.userFollow = JSON.parse(res1['_body']).following;

        for (let i = 0; i < this.userFollow.length; i++) {

          for (let j = 0; j < this.result.length; j++) {

            if (this.userFollow[i] == this.result[j].admin) {

              this.resultvalue = false;
            } else {


            }
          }
        }
      });
    });
    if (this.haveCompany) {
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = (JSON.parse(res['_body']).companyName);
        this.companyLogo = (JSON.parse(res['_body']).companyLogo);
      });
    }
  }
  onImagePick(event, name) {


    const file = < File > event.target.files[0];
    if (name === 'Image') {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
    const fdata = new FormData();

    fdata.append(name, file);
    console.log(name)
    this.imgupload.uploadImg(fdata).subscribe(res => {
      console.log(res)
      const fd = new FormData();
      this.feed.value.Image = res['_body'];
      const url = res['_body'];

      fd.append(name, url);

      this.userService.editUser(fd).subscribe(res2 => {
          this.userService.userImage = JSON.parse(res2['_body']).userImage;
      });
    });

  }
  onAddpost() {

    this.feed.value.tagId = this.feedService.tagId;
    this.feed.value.companyName=this.companyName;
    this.feed.value.companyLogo=this.companyLogo;
    this.feed.value.productName = this.feedService.productName;
    this.feed.value.productImage = this.feedService.productImage;
    this.feed.value.productDescription = this.feedService.productDescription;
    this.feedService.AddFeed(this.feed.value).subscribe(res => {

    });
    this.feed.reset();
    this.notification.success('Post Added');
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
    this.result[i].follow = false;
    this.followers.addFollow(id).subscribe(res => {

    });

  }
  onunfollow(i, id) {

    this.result[i].follow = true;
    this.followers.Unfollow(id).subscribe(res => {

    });

  }
  }