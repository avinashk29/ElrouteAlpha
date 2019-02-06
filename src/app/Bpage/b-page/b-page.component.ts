import { Component, OnInit, Inject, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ProductServiceService} from '../../Service/product-service.service';
import {FeedService} from '../../Service/feed-service.service';
import 'rxjs/add/operator/filter';
import {UserService} from '../../Service/user-services.service';
import { FormControl , FormGroup} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { JsonPipe } from '@angular/common';
import { FollowService } from 'src/app/Service/follow-service.service';
@Component({
  selector: 'app-b-page',
  templateUrl: './b-page.component.html',
  styleUrls: ['./b-page.component.css']
})
export class BPageComponent implements OnInit , OnDestroy {


one = true;
two = false;
three = false;
four = false;
items;
 expand = [];
 token;
 userInfo;
groups;
CompanyName;
category;
city;
Follower
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
companyFollowers
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
companyImage = [];
bioEdit=false;
BForm = new FormGroup ({
   website: new FormControl(''),
   Image: new FormControl(''),
   workingHours: new FormControl(),
  shortIntro: new FormControl(''),
  facebook: new FormControl(''),
  linkedin: new FormControl(''),
  google: new FormControl('')
  });
  constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService, public companyService: CompanyServiceService,
  public productService: ProductServiceService, public feedService: FeedService, public route: ActivatedRoute, private router: Router,
   public userService: UserService,private spinner:NgxUiLoaderService, private follows: FollowService,private sp:NgxSpinnerService, private imgUpload:ImageUploadService) {
    this.companyService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');
    this.subscription = this.router.events.subscribe(() => {
      this.comapnyId = this.route.snapshot.paramMap.get('id');
      this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {
        this.type = paramas.urltype;
        this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
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
            console.log(this.infoImage)
           this.certification=JSON.parse(res['_body']).certification;
           this.companyImage = JSON.parse(res['_body']).companyImage
           this.companyFollowers = JSON.parse(res['_body']).Followers.length
          this.BForm.patchValue({
           website: JSON.parse(res['_body']).website,
           Image: JSON.parse(res['_body']).Image,
           workingHours: JSON.parse(res['_body']).workingHours,
           shortIntro: JSON.parse(res['_body']).shortIntro,
          //  facebook: JSON.parse(res['_body']).socialLinks.facebook,
          //  linkedin: JSON.parse(res['_body']).socialLinks.linkedin,
          //  google: JSON.parse(res['_body']).socialLinks.google,
          });

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
      if (this.type = 'product') {
        this.productService.getProduct(this.comapnyId).subscribe(res => {
            this.products = JSON.parse(res['_body']);
            console.log(this.products[0].Image);
          console.log(JSON.parse(res['_body']))
                });
        this.type = 'product';
      }
    });
     
  }

  ngOnInit() {
    
   // this.comapnyId = this.storage.get('companyId');
   this.imgUpload.token=this.storage.get('token');
   this.feedService.token = this.storage.get('token');
   this.userService.getUserData().subscribe(res => {
     console.log(JSON.parse(res['_body']).Following);
     this.userInfo = JSON.parse(res['_body']).Following;
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


 //   this.certification =  [

 //     // {name: 'https://picsum.photos/g/200/300'},
 //   //  {name: 'https://picsum.photos/200/300?image=0'},
 // //     {name: 'https://picsum.photos/200/300/?blur'},
 // //     {name: 'https://picsum.photos/200/300/?random'},
 // //     {name: 'https://picsum.photos/200/300'},
 // //     {name: 'https://picsum.photos/g/200/300'},
 // //     {name: 'https://picsum.photos/200/300?image=0'},
 // //     {name: 'https://picsum.photos/200/300/?blur'},
 // //     {name: 'https://picsum.photos/200/300/?random'}
 // ];
 this.feedService.GetFeed().subscribe(res => {
   this.feeds =  JSON.parse(res['_body']);
   if (!this.feeds.length){
     this.noFeeds = true;
   }
   });

  }
  editbio(){
    this.bioEdit = !this.bioEdit;
  }
 
  onImagePick(event,name) {
  //  this.uploadImages = !this.uploadImages;
   // this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {uploadImages:true}});
     this.file = <File>event.target.files[0];
      const fdata = new FormData()
       fdata.append(name,this.file)
      console.log(fdata);
      this.imgUpload.uploadImg(fdata).subscribe(res=>{
        console.log(res);
        const updata = new FormData();
        const url = res['_body'];
        if(name==="certification"){
          // console.log(this.certification);
          // console.log(url)
          // console.log("m abhi yha pr hoon sbse upar")
            this.certification.push(url); 
          //   updata.append('certification',this.certification);
          //   console.log(this.certification);
          //   console.log("m abhi yha pr hoon");
          //   console.log(updata)
           let certiForm = new FormGroup({
             certification: new FormControl(this.certification)
           })
           this.companyService.UpdateCompany(certiForm.value).subscribe(response=>{
            // this.companyLogo=JSON.parse(response['_body']).url;
             console.log(JSON.parse(response['_body']));
             })
          }
          if(name==="companyImage"){
            // console.log(this.certification);
            // console.log(url)
            // console.log("m abhi yha pr hoon sbse upar")
              this.companyImage.push(url); 
            //   updata.append('certification',this.certification);
            //   console.log(this.certification);
            //   console.log("m abhi yha pr hoon");
            //   console.log(updata)
             let companyImage = new FormGroup({
               companyImage: new FormControl(this.companyImage)
             })
             this.companyService.UpdateCompany(companyImage.value).subscribe(response=>{
              // this.companyLogo=JSON.parse(response['_body']).url;
               console.log(JSON.parse(response['_body']));
               })
            }
        else{
          updata.append(name,url);
          this.companyService.UpdateCompany(updata).subscribe(response=>{
            // this.companyLogo=JSON.parse(response['_body']).url;
             console.log(JSON.parse(response['_body']));
             })
          
        }

      })
   }
 
  editProduct(id) {
    this.router.navigate(['/productEdit/' + id]);
  }
  EditBpage() {
    console.log(this.mycompanyId)
    this.router.navigate(['company-form2']);
  }
  showTwo() {
    this.type = 'info';
  }
  showThree() {
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      this.products = JSON.parse(res['_body']);
    });
    this.type = 'product';
  }
  showFour() {
    this.type = 'contact';
  }
  editshortBio(){
    
  }
DeleteProduct(id) {
this.productService.DeleteProduct(id).subscribe(res => {
});
 }
 GotoBpage() {
   this.router.navigate(['/companyPage/' + this.comapnyId]);
 }
 onEditBpage(key, content: HTMLInputElement ) {
   console.log(key);
   const formData = new FormData();
    formData.append(key, content.value);
  this.companyService.UpdateCompany(formData).subscribe(res => {
     console.log(JSON.parse(res['_body']));
   });
 // console.log(this.BForm.value);
  this.editwebsite = false;
  this.editworkingHours = false;
  this.editshortIntro = false;
  this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'default'}});
 }
//  updateLogo(key,content:HTMLInputElement){
//   const fdata=new FormData();
//   fdata.append(key,content.value);
//   this.companyService.UpdateCompany(fdata).subscribe(res=>{
//     console.log(res);
//   });
// }
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
ngOnDestroy() {
  this.subscription.unsubscribe();
}
}