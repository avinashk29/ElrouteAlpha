import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../Service/user-services.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { HomepageService } from "../homepage.service";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../Auth/auth-service.service";
import { FollowService } from "src/app/Service/follow-service.service";
import { FormGroup, FormControl } from "@angular/forms";
import { FeedService } from "../../Service/feed-service.service";
import { CompanyServiceService } from "../../Service/company-service.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FeedComponent } from "src/app/Post-feed/Feed/feed/feed.component";
import { ImageUploadService } from "src/app/Service/imageupload-service.service";
import { ProductServiceService } from "../../Service/product-service.service";

import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
@Component({
  selector: "app-with-login",
  templateUrl: "./with-login.component.html",
  styleUrls: ["./with-login.component.css"]
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
  file;
  imagePreview;
  feeds = [];
  noFeeds = true;
  addLink = false;
  image;
  title;
  userImage;
  feedImage
  companyLogo;
  feed = new FormGroup({
    content: new FormControl(""),
    Image: new FormControl(" "),
    tagId: new FormControl(),
    link: new FormControl(""),
    productName: new FormControl(""),
    productImage: new FormControl(),
    productDescription: new FormControl("")
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
    private spinner:Ng4LoadingSpinnerService
  ) {
   
  }
  show = false;
  ngOnInit() {
    this.imgupload.token = this.storage.get("token");
    this.feedService.token = this.storage.get("token");
    this.haveCompany = this.storage.get("companyId");
    this.feedService.getCompanyFeed().subscribe(res => {
      this.feeds = JSON.parse(res["_body"]);
      this.result = JSON.parse(res["_body"])[0];
      if (this.result) {
        this.pId = JSON.parse(res["_body"])[0]._id;
        for (let i = 0; i < JSON.parse(res["_body"])[0].length; i++) {
          this.productService
            .getOneProduct(JSON.parse(res["_body"])[0][i].tagId)
            .subscribe(res1 => {});
        }
      }
      if (!this.feeds.length) {
        this.noFeeds = true;
      }
      this.userService.getUserData().subscribe(res1 => {
        
        this.userFollow = JSON.parse(res1["_body"]).following;

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
      // this.companyName = this.companyService.companyData.companyName;
        // this.companyLogo = this.companyService.companyData.companyLogo;
      this.companyService.GetoneCompany(this.haveCompany).subscribe(res => {
        this.companyName = JSON.parse(res["_body"]).companyName;
        this.companyLogo = JSON.parse(res["_body"]).companyLogo;
      });
    }
  }
  uploadUserImage(event,name){
    console.log(name)
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
       const url=res['_body'];
       formdata.append(name,url);
       if(name==='userImage'){
        this.userService.editUser(formdata).subscribe(res=>{
          this.userService.userData.userImage=JSON.parse(res['_body']).userImage;
          this.spinner.hide();
          });
       }else{
        this.feedImage=url;
        this.spinner.hide();
       }
     })
  }
 
  onAddpost() { 
    this.feed.value.tagId = this.feedService.tagId;
    this.feed.value.Image=this.feedImage;
    this.feedService.AddFeed(this.feed.value).subscribe(res => {});
    this.feed.reset();
    this.notification.success("Post Added");
  }
  tagFeed() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(FeedComponent, dialogConfig);
  }
  EditBpage() {
    this.router.navigate(["/company-form2"]);
  }
  CreateBpage() {
    this.router.navigate(["/B-page"]);
  }
  onfollow(i, id) {
    this.result[i].follow = false;
    this.followers.addFollow(id).subscribe(res => {});
  }
  onunfollow(i, id) {
    this.result[i].follow = true;
    this.followers.Unfollow(id).subscribe(res => {});
  }
}
