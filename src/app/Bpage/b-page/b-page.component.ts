import {
  Component,
  OnInit,
  Inject,NgZone
} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CompanyServiceService } from '../../Service/company-service.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ProductServiceService } from '../../Service/product-service.service';
import { FeedService } from '../../Service/feed-service.service';
import 'rxjs/add/operator/filter';
import { UserService } from '../../Service/user-services.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ProductSelectComponent } from 'src/app/Product/product-select/product-select.component';
import { CompanyContactComponent } from 'src/app/Company/company-contact/company-contact.component';
import { LoginComponent } from 'src/app/Auth/login/login.component';
import { FeedComponent } from 'src/app/Post-feed/Feed/feed/feed.component';
import { ToastrService } from "ngx-toastr";
import { FeedShareComponent } from 'src/app/Post-feed/feed-share/feed-share.component';
// import * as $ from 'jquery';
declare var $:any;

import { NgxSpinnerService } from 'ngx-spinner';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Meta, Title } from '@angular/platform-browser';
// import { type } from 'os';

@Component({
  selector: 'app-b-page',
  templateUrl: './b-page.component.html',
  styleUrls: ['./b-page.component.css']
})
export class BPageComponent implements OnInit {
  companyName;
  sectionEdit = false;
  logoLoading=false;
  one = true;
  two = false;
  three = false;
  four = false;
  userInfo = [];
  showAll =[];
  Follower;
  bookmark;
  file;
  uploadImages = false;
  certification = [];
  companyFollowers;
  products = [];
  contact = [];
  comapnyId;
  mycompanyId;
  type;
  feeds = [];
  feedById=[];
  shortbioEdit = false;
  noFeeds = false;
  myCompany = false;
  editwebsite = false;
  editSocialLinks = false;
  editworkingHours = false;
  editshortIntro = false;
  imagePreview;
  section = [];
  url;
  socialLink = [];
  loading;
  companyImage = [];
  bioEdit = false;
  userBookmark;
  basicDetail = false;
  linkEdit = false;
  follower;
  linkedin;
  likedinEdit = false;
  limit;
  time1;
  time2;
  postBookmark=[];
  productBookmark=[];
  token;
  userbookm=[];
  Bproduct=[]
  haveCompany;
  feedImageLoading;
  // file=[];
  // imagePreview;
  // feeds = [];
  // noFeeds = true;
  addLink = false;
  feedImage;
  companyLogo;
  socialIcon={
    "Facebook":'../../../../../assets/images/facebook.png',
    "Instagram":'../../../../../assets/images/instagram.png',
    "Alibaba":'../../../../../assets/images/alibaba.png',
    "Tradeindia":'../../../../../assets/images/tradeindia.png',
    "Indiamart":'../../../../../assets/images/indiamart.jpg',
    "Twitter":'../../../../../assets/images/twitter.png',
    "Pinterest":'../../../../../assets/images/pinterest.png',
    "Linkedin":'../../../../../assets/images/linkedin.png'
  };
  links=[];
  feed = new FormGroup({
    content: new FormControl(''),
    Image: new FormControl(''),
    tagId: new FormControl(),
    link: new FormControl(''),
  });
  shotedProduct;
  BForm: FormGroup;
  GroupForm = new FormGroup({
    groupName: new FormControl(''),
    products: new FormControl('')
  });
  subscription;
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public companyService: CompanyServiceService,
    public productService: ProductServiceService,
    public feedService: FeedService,
    public route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private follows: FollowService,
    private bookmarkService: BookmarkServices,
    private imgUpload: ImageUploadService,
    private imageService: ImageUploadService,
    private _fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public ngZone: NgZone,
    public dialog: MatDialog,
    public notification: ToastrService,
    public meta: Meta, public title: Title

  ) {
    this.comapnyId = this.route.snapshot.paramMap.get('id');
this.subscription = this.router.events.subscribe( () => {
  this.comapnyId = this.route.snapshot.paramMap.get('id');
// console.log(this.comapnyId);

});

    this.BForm = this._fb.group({
      website: [''],
      Image: [''],

      openAt: [],
      closeAt: [],
      shortIntro: [],
      facebook: [''],
      linkedin: [''],
      gmail: [''],
      section: this._fb.array([]),

    });

    // this.comapnyId = this.route.snapshot.paramMap.get('id');
this.bookmarkService.token=this.storage.get('token')
this.token = this.storage.get('token');
this.follows.token=this.storage.get('token');
this.route.params.filter(params=> params.id).subscribe(id=>{
  this.comapnyId=id.id;
  console.log(this.companyService.companyData.url)
  this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
    console.log(JSON.parse(res['_body']));
    this.links = JSON.parse(res['_body']).links;
    this.companyService.companyData = JSON.parse(res['_body']);
    this.meta.updateTag({ property: 'og:description', content: JSON.parse(res['_body']).shortIntro }); 
    this.meta.updateTag({ property: 'og:url', content: window.location.href }); 
    this.meta.updateTag({ property: 'og:image', content: JSON.parse(res['_body']).companyLogo }); 
    this.meta.updateTag({property:'og:title',content:JSON.parse(res['_body']).companyName})
    this.title.setTitle(JSON.parse(res['_body']).companyName);

    if (this.comapnyId === this.mycompanyId) {
      this.myCompany = true;
    } else {
      this.myCompany = false;
    }
})
this.loading=true;
this.feedService.getFeedById(this.comapnyId).subscribe(res1=>{
  ngZone.run(()=>{

    this.feedById=JSON.parse(res1['_body']);
  
  })
  this.loading=false;
})
})
    this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {

        this.type = paramas.urltype;
        this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
          this.companyService.companyData = JSON.parse(res['_body']);

          this.certification = JSON.parse(res['_body']).certification;
          this.companyImage = JSON.parse(res['_body']).companyImage;
          this.companyFollowers = JSON.parse(res['_body']).followers.length;
          this.contact = JSON.parse(res['_body']).contact;
          // console.log(this.companyFollowers);
          this.setSection();


        });

          if (this.type === 'product') {
            this.two = false;
            this.three = true;
            this.four = false;
            this.one = false;
            this.type = 'product';
            console.log(this.comapnyId)
            this.productService.getProduct(this.comapnyId).subscribe(res => {
              this.productService.products =  JSON.parse(res['_body']);
           
            });
          }

      });


    this.mycompanyId = this.storage.get('companyId');

   if (this.type === 'info') {
      this.two = true;
      this.three = false;
      this.four = false;
      this.one = false;
      this.type = 'info';

    }
    else if (this.type === 'contact') {
      this.type = 'contact  ';
      this.two = false;
      this.three = false;
      this.four = true;
      this.one = false;
    }
    if (this.comapnyId === this.mycompanyId) {
      this.myCompany = true;
    } else {
      this.myCompany = false;
    }

  }
 

  ngOnInit() {
    $(document).ready(function () {
      var img = $('.picture-container img');
      var y1 = $('.picture-container').height();
          var y2 = img.height();
          var x1 = $('.picture-container').width();
          var x2 = img.width();
          var desktop_start_x=0;
          var desktop_start_y=0;
          var mobile_start_x= -200;
          var mobile_start_y= -200;
              $('.save').click(function(event){
                      event.preventDefault();
                      var t = img.position().top,
             l = img.position().left;
                     img.attr('data-top', t);
                      img.attr('data-left', l);
                      img.draggable({ disabled: true });
          })
              $('.pos').click(function(event){
                event.preventDefault();
                  img.draggable({ 
                    disabled: false,
                    scroll: false,
                    axis: 'y, x',
                    cursor : 'move',
                     drag: function(event, ui) {
                                             if(ui.position.top >= 0)
                                              {
                                                  ui.position.top = 0;
                                              }
                                              if(ui.position.top <= y1 - y2)
                                              {
                                                  ui.position.top = y1 - y2;
                                              }
                                              if (ui.position.left >= 0) {
                                                ui.position.left = 0;
                                              };
                                               if(ui.position.left <= x1 - x2)
                                              {
                                                  ui.position.left = x1 - x2;
                                              }
                   }
            });
            });
          });

    /*-------------------------------------------------------------------------------------------------*/
    this.productService.token = this.storage.get('token');
    if(!this.companyService.companyData.companyLogo){
      this.companyService.companyData.companyLogo='';
    }

    this.imgUpload.token = this.storage.get('token');
    this.feedService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {     
    });
    
    this.mycompanyId = this.storage.get('companyId');
    this.route.queryParams
      .filter(paramas => paramas.urltype)
      .subscribe(paramas => {
        this.type = paramas.urltype;
      });


    this.feedService.getFeedById(this.comapnyId).subscribe(res1=>{
      this.loading=false;
      this.feedById=JSON.parse(res1['_body']);
    });
  

  }
  onAddSection() {
    this.sectionEdit = true;
    const control = <FormArray>this.BForm.controls.section;
    control.push(
      this._fb.group({
        sectionTitle: ['', Validators.required],
        sectionContent: ['', Validators.required],
        sectionImage: [Validators.required],
        sectionLink: ['']
      })
    );
  }
  setSection() {
    const control = <FormArray>this.BForm.controls.section;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.companyService.companyData.section.forEach(x => {
      // x.clearValidators()
      control.push(
        this._fb.group({
          sectionImage: x.sectionImage,
          sectionTitle: x.sectionTitle,
          sectionContent: x.sectionContent,
          sectionLink: x.sectionLink

        })
      );
    });
  }
  gotoTimeline() {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'default' }
    });
    this.one = true;
    this.two = false;
this.three = false;
this.four = false;
  }
  onDelete(index) {
    if (confirm('Are you sure you want to delete the section?')){
    const control = <FormArray>this.BForm.controls.section;
    control.removeAt(index);
    this.notification.success('Section Deleted');
  }
}

  editbio() {
    this.bioEdit = !this.bioEdit;
  }
  onsectionImagePick(event, name, index) {
    
    this.file = <File>event.target.files[0];
    const fdata = new FormData();
    fdata.append(name, this.file);
    
    this.imgUpload.uploadImg(fdata).subscribe(res => {
      const updata = new FormData();
      const url = res['_body'];
      let control = <FormArray>this.BForm.controls.section;
      this.companyService.companyData.section=control.value;
      this.companyService.companyData.section[index].sectionImage = url;
      this.setSection();

    });
    
  }

  uploadCompanyImage(event,name){
    if(name==='companyLogo'){
      this.logoLoading=true;
    }
    this.file=<File>event.target.files[0];
    const fdata=new FormData();
    fdata.append(name,this.file);
    
    this.imgUpload.uploadImg(fdata).subscribe(res=>{
      const formdata=new FormData();
        const url=res['_body'];
        formdata.append(name,url);
      
      if(name==='companyLogo' || name==='coverImage' || name==='infoImage'){
          this.companyService.UpdateCompany(formdata).subscribe(res=>{
              this.companyService.companyData.companyLogo=JSON.parse(res['_body']).companyLogo;
              this.companyService.companyData.infoImage=JSON.parse(res['_body']).infoImage;
              this.companyService.companyData.coverImage=JSON.parse(res['_body']).coverImage;
              // this.spinner.hide();
              this.logoLoading=false;
          });
      }else if(name === 'certification'){
        this.certification.push(url);
        const certiForm = new FormGroup({
          certification: new FormControl(this.certification)
        });
        this.companyService
          .UpdateCompany(certiForm.value)
          .subscribe(response => {
            this.companyService.companyData.certification = JSON.parse(
              response['_body']
            ).certification;
          });
        this.spinner.hide();
      } else {
        this.companyImage.push(url);
        let companyImage = new FormGroup({
          companyImage: new FormControl(this.companyImage)
        });
        this.companyService
          .UpdateCompany(companyImage.value)
          .subscribe(response => {
            this.companyService.companyData.companyImage = JSON.parse(
              response['_body']
            ).companyImage;
          });
        this.spinner.hide();
      }
    });


  }

  editProduct(id) {
    this.router.navigate(['/productEdit/' + id]);
  }
  EditBpage() {
    this.router.navigate(['company-edit/general']);
  }
  showTwo() {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'info' }
    });
    this.two = true;
this.three = false;
this.four = false;
this.one = false;
    this.type = 'info';

  }
  showThree() {
    this.productService.token = this.storage.get('token');
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      this.productService.products= JSON.parse(res['_body']);
    });
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'product' }
    });
    this.one = false;
    this.two = false;
this.three = true;
this.four = false;
    this.type = 'product';
  }
  showFour() {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'contact' }
    });
    this.one = false;
    this.two = false;
this.three = false;
this.four = true;
    this.type = 'contact';
  }
  editshortBio() { }
  DeleteProduct(id) {
    this.productService.DeleteProduct(id).subscribe(res => { });
  }
  GotoBpage() {
    this.router.navigate(['/companyPage/' + this.comapnyId]);
  }
   onEditBpage(key, content: HTMLInputElement) {
    
    const formData = new FormData();
    formData.append(key, content.value);
    
    
    if (key === 'workingHours') {
      content.value = this.time1 + '-' + this.time2;
      formData.append(key, content.value);
      
    }
    this.companyService.UpdateCompany(formData).subscribe(res => {
      this.companyService.companyData.website = JSON.parse(res['_body']).website;
      this.companyService.companyData.openAt = JSON.parse(
        res['_body']
      ).openAt;
      this.companyService.companyData.closeAt = JSON.parse(
        res['_body']
      ).closeAt;

      this.companyService.companyData.socialLinks=JSON.parse(res['_body']).socialLinks;
      this.companyService.companyData.shortIntro = JSON.parse(res['_body']).shortIntro;
      this.router.navigate(['/companyPage/' + this.comapnyId], {
        queryParams: { urltype: 'edit' }
      });
      if (this.type === 'info') {
        this.router.navigate(['/companyPage/' + this.comapnyId], {
          queryParams: { urltype: 'info' }
        });
      } else {
        this.router.navigate(['/companyPage/' + this.comapnyId], {
          queryParams: { urltype: 'default' }
        });
      }
    });
    this.editwebsite = false;
    this.editworkingHours = false;
    this.editshortIntro = false;
    this.editSocialLinks = false;

  }

  onfollow(id) {
    
    
    this.follows.addFollow(id).subscribe(res => {
      this.companyFollowers+=1;
      this.companyService.companyData.follow=true;
      
       });

  }
  onunfollow(id) {
    
    this.follows.Unfollow(id).subscribe(res => {
        this.companyService.companyData.follow=false;
        this.companyFollowers -=1;
  
      
    });
  }

  onSubmit() {

    if (this.BForm.controls.section.valid){
      this.sectionEdit = false;
      const sectionForm = new FormGroup({
        section: new FormControl(this.BForm.value.section)
      });
      this.companyService.UpdateCompany(sectionForm.value).subscribe(res => {
        this.companyService.companyData.section = JSON.parse(res['_body']).section;
        this.notification.success("Section Added");
      });
    } else {
      this.notification.error("Enter complete details")
    }

  }
  onadeleteImg(item) {
        const i = this.certification.indexOf(item);
        
        if(confirm('Are you sure you want to delete')){
          this.certification.splice(i, 1);
          let certiForm = new FormGroup({
            certification: new FormControl(this.certification)
          });
          this.companyService
            .UpdateCompany(certiForm.value)
            .subscribe(response => {
              this.notification.success('Certificate Deleted');
              this.companyService.companyData.certification = JSON.parse(
                response['_body']
              ).certification;
            });
        }

  }
  onDeleteCompanyImg(item, index) {
        const i = this.companyImage.indexOf(item);
        if(confirm('Are you sure you want to delete')){
          this.companyImage.splice(i, 1);
          let companyImage = new FormGroup({
            companyImage: new FormControl(this.companyImage)
          });
          this.companyService
            .UpdateCompany(companyImage.value)
            .subscribe(response => {
              this.notification.success('Company Image Deleted');
              this.companyService.companyData.companyImage = JSON.parse(
                response['_body']
              ).companyImage;
            });
        }


  }
  addBookmark(id) {
    
    
    this.bookmarkService.addCompanyBookmark(id).subscribe(res => {
      this.companyService.companyData.bookm = true;
      this.notification.success('Added to your company bookmark');
     
    });
  }
  removeBookmark(id) {
    
    
    this.bookmarkService
      .DeleteBookmarkCompany(id)
      .subscribe(res => {
        this.companyService.companyData.bookm = false;
        this.notification.success('Removed from your comapany bookmark');
      });
  }
  onAddproductTogroup(key) {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { edit: 'true'}
    });
// console.log(key);
this.productService.key = key;
const dialogConfig = new MatDialogConfig();
dialogConfig.autoFocus = true;
dialogConfig.width = '80%';
this.dialog.open(ProductSelectComponent, dialogConfig);
  }
  onRemoveproduct(id) {
if(confirm('Are you sure you want to remove the product from group')) {
  this.productService.groupProductdelete(id).subscribe(res => {
    this.notification.success('Product Removed From Group');
    this.ngZone.run(() => {
      this.productService.getProduct(this.comapnyId).subscribe(res1 => {
        this.productService.products =  JSON.parse(res1['_body']);
    
      });
      
    });
    
    
  });
}
  }
onDeletegroup(name) {
if (confirm('Are you sure you want to remove the group')){
  this.spinner.show();
  this.productService.token = this.storage.get('token');
  
this.productService.deletegroup(name).subscribe(res => {
  this.notification.success('Group Deleted');
  
  this.ngZone.run(() => {
    this.productService.getProduct(this.comapnyId).subscribe(res1 => {
      this.productService.products =  JSON.parse(res1['_body']);
       this.spinner.hide();
    });
  });
});
}

}

onShowAllProduct(index) {
  
  
  this.showAll[index]= !this.showAll[index]
}
onAddContact() {
  this.router.navigate(['/companyPage/' + this.comapnyId], {
    queryParams: { edit: 'true'}
  });
  const dialogConfig = new MatDialogConfig();

dialogConfig.width = '48%';
  this.dialog.open(CompanyContactComponent, dialogConfig);
}
addFeedBookmark(i,id){
  this.feedById[i].bookm=true;
  this.bookmarkService.addPostBookmark(id).subscribe(res=>{
  
    this.notification.success('Added to your company feed bookmark');
  });
}
removeFeedBookmark(i,id){
  this.feedById[i].bookm=false;
  this.bookmarkService.DeletePostBookmark(id).subscribe(res=>{
    this.notification.success('Removed from your company feed bookmark');
  
  });
}
addProductBookmark(i,j,id){
  
// console.log(id)
  this.bookmarkService.addProductBookmarks(id).subscribe(res=>{
  // console.log(res)
  this.productService.products[i].sortedProducts[j].bookm=true;
    this.notification.success('Added to your company product bookmark');
  });
}
removeProductBookmark(i,j,id){
  
  this.bookmarkService.DeleteProductBookmark(id).subscribe(res=>{
    this.productService.products[i].sortedProducts[j].bookm=false;
    this.notification.success('Removed from your company product bookmark');
  });
}
opneLogin(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '30%';
  this.dialog.open(LoginComponent, dialogConfig);
}
onDeletePost(id) {
  if (confirm('Are you sure you want to delete the post')) {
    const i = this.feedById.indexOf(id);
    this.feedById.splice(i , 1);

    this.feedService.deletePost(id).subscribe(res => {
      this.feedService.getFeedById(this.comapnyId).subscribe(res1=>{
        this.feedById=JSON.parse(res1['_body']);
  
    });

      

    });
  }
  }
  onSharepost(i, admin, image) {
  // console.log(i);
  // console.log(image);
    this.feedService.postId = i;
    this.feedService.postadmin = admin;
    this.feedService.postImage = image;
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;

    dialogConfig.width = '20%';
      this.dialog.open(FeedShareComponent, dialogConfig);
  }




  //  on edit time

  onEditTime(){
    const formData = new FormData();
    formData.append('openAt', this.BForm.value.openAt );
    formData.append('closeAt', this.BForm.value.closeAt );
    this.companyService.UpdateCompany(formData).subscribe(res => {
      this.companyService.companyData.openAt = JSON.parse(
        res['_body']
      ).openAt;
      this.companyService.companyData.closeAt = JSON.parse(
        res['_body']
      ).closeAt;

  
    });
    this.editworkingHours=false;
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
         
         });
         this.spinner.hide();
        }else{
       this.feedImage=this.url;
       this.spinner.hide();
       
      }
      
    })
 }
  onAddpost() {
    this.addLink = false;
    this.feed.value.tagId = this.feedService.tagId;
      this.feed.value.Image = this.feedImage;
    


    if (this.feed.value.Image&&this.feed.value.content) {
      this.feedService.AddFeed(this.feed.value).subscribe(res => {
      // console.log(JSON.parse(res['_body']));
      this.feedService.getFeedById(this.comapnyId).subscribe(res1=>{
        this.feedById=JSON.parse(res1['_body']);
        // console.log(JSON.parse(res1['_body']))
      //----------------------------------------bookmark at Bpage------------------- //
     
    });
      });
      this.feed.reset();
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
