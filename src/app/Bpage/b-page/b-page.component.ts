import { Component, OnInit, Inject, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CompanyServiceService} from '../../Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {ProductServiceService} from '../../Service/product-service.service';
import {FeedService} from '../../Service/feed-service.service';
import 'rxjs/add/operator/filter';
import {UserService} from '../../Service/user-services.service';
import { FormControl , FormGroup, FormBuilder, FormArray} from '@angular/forms';
// import { NgxUiLoaderSe÷rvice } from 'ngx-ui-loader';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
@Component({
  selector: 'app-b-page',
  templateUrl: './b-page.component.html',
  styleUrls: ['./b-page.component.css']
})
export class BPageComponent implements OnInit{

sectionEdit = false;
one = true;
two = false;
three = false;
four = false;
items;
 expand = [];
 token;
 userInfo = [];
groups;
CompanyName;
category;
city;
Follower;
bookmark;
file;
uploadImages = false;
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
companyFollowers=[];
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
editSocialLinks=false;
editworkingHours = false;
editshortIntro = false;
imagePreview;
infoImage;
section=[];
socialLink=[]
companyImage = [];
bioEdit=false;
userBookmark;
basicDetail=false;
linkEdit=false;
follower;

// BForm = new FormGroup ({
  //  website: new FormControl(''),
  //  Image: new FormControl(''),
  //  workingHours: new FormControl(),
  // shortIntro: new FormControl(''),
  // facebook: new FormControl(''),
  // linkedin: new FormControl(''),
  // google: new FormControl('')
//   });
BForm: FormGroup;

  constructor(@Inject (LOCAL_STORAGE) private storage: WebStorageService, public companyService: CompanyServiceService,
  public productService: ProductServiceService, public feedService: FeedService, public route: ActivatedRoute, private router: Router,
   public userService: UserService, private follows: FollowService,private bookmarkService:BookmarkServices,
    private imgUpload:ImageUploadService,private _fb:FormBuilder, private ngZone: NgZone) {
    this.BForm = this._fb.group({
      website: [''],
      Image: [''],
      workingHours: [],
     shortIntro: [],
     facebook: [''],
     linkedin: [''],
     google: [''],
     socialLinks:[''],
     section: this._fb.array([])
    });
    if (this.comapnyId === this.mycompanyId) {
      this.myCompany = true;
    } else {
      this.myCompany = false;
    }
    this.companyService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');
      this.comapnyId = this.route.snapshot.paramMap.get('id');
      this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {
        this.type = paramas.urltype;
        this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
          console.log(JSON.parse(res['_body']));
          this.companyService.CompanyName = JSON.parse(res['_body']).companyName;
          this.companyService.category = JSON.parse(res['_body']).category;
          this.companyService.city = JSON.parse(res['_body']).city;
          this.companyService.companyEmail = JSON.parse(res['_body']).companyEmail;
          this.companyService.country = JSON.parse(res['_body']).country;
          this.companyService.industry = JSON.parse(res['_body']).industry;
          this.companyService.shortIntro = JSON.parse(res['_body']).shortIntro,
          this.companyService.website = JSON.parse(res['_body']).website;
          this.companyService.workingHours = JSON.parse(res['_body']).workingHours;
          this.companyService.yearEstd = JSON.parse(res['_body']).yearEstd;
          this.companyType = JSON.parse(res['_body']).companyType;
          this.companyService.address = JSON.parse(res['_body']).address;
          this.companyService.companySize = JSON.parse(res['_body']).companySize;
           this.companyService.Image = JSON.parse(res['_body']).coverImage;

           this.companyService.companyLogo = JSON.parse(res['_body']).companyLogo;
           this.companyService.infoImage = JSON.parse(res['_body']).infoImage;
            this.companyService.section = JSON.parse(res['_body']).section;
           this.certification = JSON.parse(res['_body']).certification;
           this.companyImage = JSON.parse(res['_body']).companyImage;
          this.companyFollowers = JSON.parse(res['_body']).followers.length;
          this.socialLink = JSON.parse(res['_body']).socialLinks;
          // this.BForm.patchValue({
          //  website: JSON.parse(res['_body']).website,
          //  Image: JSON.parse(res['_body']).Image,
          //  workingHours: JSON.parse(res['_body']).workingHours,
          //  shortIntro: JSON.parse(res['_body']).shortIntro,
          // //  socialLinks:JSON.parse(res['_body']).socialLinks
          // });

this.setSection();



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
            console.log(JSON.parse(res['_body']));
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

// b form for section info



  }


  ngOnInit() {

   this.imgUpload.token=this.storage.get('token');
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

 this.feedService.GetFeed().subscribe(res => {
   this.feeds =  JSON.parse(res['_body']);
   console.log(this.feeds.length)
console.log(JSON.parse(res['_body']))
   if (!this.feeds.length){
     this.noFeeds = true;
   }
   });
   // ------------------------------------------bookmark at Bpage------------------- //
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
  }
 onAddSection(){
   this.sectionEdit=true;
   console.log(this.sectionEdit);
   console.log('here i am')
let control=<FormArray>this.BForm.controls.section;
control.push(this._fb.group({
  sectionTitle:[''],
  sectionContent:[''],
   sectionImage:['']
}))
 }
 setSection(){
   let control=<FormArray>this.BForm.controls.section;
   while(control.length!==0){
     control.removeAt(0);
   }
  console.log(this.companyService.section)
   this.companyService.section.forEach(x => {
     control.push(this._fb.group({
       sectionTitle: x.sectionTitle,
       sectionContent: x.sectionContent,
       sectionImage: x.sectionImage
     }));
   });
 }
 gotoTimeline(){
  this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'default'}});
 }
onDelete(index){
  let control = <FormArray>this.BForm.controls.section;
  control.removeAt(index)
}

 editbio(){
    this.bioEdit = !this.bioEdit;
  }
 onsectionImagePick(event,name,index){
  this.file = <File>event.target.files[0];
  const fdata = new FormData()
   fdata.append(name,this.file)
  console.log(fdata);
  this.imgUpload.uploadImg(fdata).subscribe(res=>{
    console.log(res);
    const updata = new FormData();
    const url = res['_body'];
    console.log(res);
    let control = <FormArray>this.BForm.controls.section;
    control.value[index].sectionImage= url;
    console.log(control);
  });
 }

 PickInfoImage(event ,name){
  //  this.uploadImages = !this.uploadImages;
  console.log(name)
     this.file = <File>event.target.files[0];
      const fdata = new FormData()
       fdata.append(name,this.file)
      console.log(fdata);
      this.imgUpload.uploadImg(fdata).subscribe(res=>{
        console.log(res);
        const updata = new FormData();
        const url = res['_body'];
          if(name==="certification"){
            console.log(this.certification)
              this.certification.push(url);
               let certiForm = new FormGroup({
               certification: new FormControl(this.certification)
             })
             this.companyService.UpdateCompany(certiForm.value).subscribe(response=>{
               console.log(JSON.parse(response['_body']));
               this.companyService.certification=JSON.parse(response['_body']).certification;
               });
            }
            else {
              console.log("m abhi yha pr hoon sbse upar")
              this.companyImage.push(url);
             let companyImage = new FormGroup({
               companyImage: new FormControl(this.companyImage)
             });
             this.companyService.UpdateCompany(companyImage.value).subscribe(response=>{
               console.log(JSON.parse(response['_body']));
               this.companyService.companyImage=JSON.parse(response['_body']).companyImage;
               });
        
            } 
  
      });


 }

  onImagePick(event,name) {
  console.log(name)
     this.file = <File>event.target.files[0];
      const fdata = new FormData()
       fdata.append(name,this.file)
      console.log(fdata);
      this.imgUpload.uploadImg(fdata).subscribe(res=>{

        console.log(res);
        const updata = new FormData();
        const url = res['_body'];
              updata.append(name,url);
            this.companyService.UpdateCompany(updata).subscribe(response => {
                this.companyService.companyLogo = JSON.parse(response['_body']).companyLogo;
                this.companyService.Image = JSON.parse(response['_body']).coverImage;
              
               });
      });

   }

  editProduct(id) {
    this.router.navigate(['/productEdit/' + id]);
  }
  EditBpage() {
    console.log(this.mycompanyId)
    this.router.navigate(['company-form2']);
  }
  showTwo() {
    this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'info'}});
     this.type = 'info';
     console.log(this.type);
  }
  showThree() {
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      this.products = JSON.parse(res['_body']);
    });
    this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'product'}});
     this.type = 'product';
    console.log(this.type);
  }
  showFour() {
    this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'contact'}});
    this.type = 'contact';
    console.log(this.type);
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
    this.ngZone.run(() => {
      console.log(res);
      this.website = JSON.parse(res['_body']).website;
      // Image: JSON.parse(res['_body']).Image,
      this.companyService.workingHours = JSON.parse(res['_body']).workingHours;
      this.companyService.shortIntro = JSON.parse(res['_body']).shortIntro;
       console.log(JSON.parse(res['_body']));
       this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'edit'}});
       if (this.type === 'info') {
        this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'info'}});
      } else {
         this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'default'}});
      }
    });

   });
  this.editwebsite = false;
  this.editworkingHours = false;
  this.editshortIntro = false;
  this.editSocialLinks=false;
  console.log(this.type)

  // this.router.navigate(['/companyPage/' + this.comapnyId ], {queryParams: {urltype: 'default'}});
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


onSubmit(){
  this.sectionEdit=false;
  const sectionForm = new FormGroup({
    section: new FormControl(this.BForm.value.section)
  })
  this.companyService.UpdateCompany(sectionForm.value).subscribe(res => {
    this.companyService.section = JSON.parse(res['_body']).section;
  });
}
onadeleteImg(item,index){
  console.log(item,index)
this.certification.splice(item,index);
}
onDeleteCompanyImg(item,index){
  console.log(item,index)
  this.companyImage.splice(item,index)
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