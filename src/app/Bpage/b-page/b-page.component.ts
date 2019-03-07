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
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ProductSelectComponent } from 'src/app/Product/product-select/product-select.component';
@Component({
  selector: 'app-b-page',
  templateUrl: './b-page.component.html',
  styleUrls: ['./b-page.component.css']
})
export class BPageComponent implements OnInit {
  sectionEdit = false;
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
  companyFollowers = [];
  products = [];
  comapnyId;
  mycompanyId;
  type;
  feeds = [];
  shortbioEdit = false;
  noFeeds = false;
  myCompany = false;
  editwebsite = false;
  editSocialLinks = false;
  editworkingHours = false;
  editshortIntro = false;
  imagePreview;
  section = [];
  socialLink = [];
  companyImage = [];
  bioEdit = false;
  userBookmark;
  basicDetail = false;
  linkEdit = false;
  follower;
  linkedin;
  likedinEdit = false;
  limit;
  BForm: FormGroup;
  GroupForm = new FormGroup({
    groupName: new FormControl(''),
    products: new FormControl('')
  });
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
    private _fb: FormBuilder,
    private spinner: Ng4LoadingSpinnerService,
    public ngZone: NgZone,
    public dialog: MatDialog,
  ) {

    this.BForm = this._fb.group({
      website: [''],
      Image: [''],
      workingHours: [],
      shortIntro: [],
      facebook: [''],
      linkedin: [''],
      gmail: [''],
      section: this._fb.array([])
    });

    this.comapnyId = this.route.snapshot.paramMap.get('id');
this.bookmarkService.token=this.storage.get('token')
this.follows.token=this.storage.get('token');
    this.route.queryParams.filter(paramas => paramas.urltype).subscribe(paramas => {
        this.type = paramas.urltype;
        this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
          this.companyService.companyData = JSON.parse(res['_body']);
          this.certification = JSON.parse(res['_body']).certification;
          this.companyImage = JSON.parse(res['_body']).companyImage;
          console.log( JSON.parse(res['_body']));
          this.companyFollowers= JSON.parse(res['_body']).followers.length;
          console.log(this.companyFollowers)
          this.setSection();


        });

          if (this.type === 'product') {
            this.two = false;
            this.three = true;
            this.four = false;
            this.one = false;
            this.type = 'product';
            this.productService.getProduct(this.comapnyId).subscribe(res => {
              this.products =  JSON.parse(res['_body']);
              console.log(typeof(this.products));
              console.log(JSON.parse(res['_body']));
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
    if (this.type === 'contact') {
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

    this.imgUpload.token = this.storage.get('token');
    this.feedService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      this.userInfo = JSON.parse(res['_body']).following;
      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.comapnyId ===this.userInfo[i]) {
          this.Follower = true;
        } else {
          this.Follower = false;
        }
      }
    });
    this.productService.token = this.storage.get('token');
    this.mycompanyId = this.storage.get('companyId');
    this.route.queryParams
      .filter(paramas => paramas.urltype)
      .subscribe(paramas => {
        this.type = paramas.urltype;
      });

    this.feedService.GetFeed().subscribe(res => {
      this.feeds = JSON.parse(res['_body']);
      if (!this.feeds.length) {
        this.noFeeds = true;
      }
    });
    // ------------------------------------------bookmark at Bpage------------------- //
    this.userService.getUserData().subscribe(res => {
      this.userBookmark = JSON.parse(res['_body']).bookmarks.company;
      for (let i = 0; i < this.userBookmark.length; i++) {
        if (this.comapnyId === this.userBookmark[i]) {
          this.bookmark = true;
        } else {
          this.bookmark = false;
        }
      }
    });
    if (this.type === 'product') {
      this.type = 'product';
      this.ngZone.run(() => {
        this.productService.getProduct(this.comapnyId).subscribe(res => {
          this.products =  JSON.parse(res['_body']);
          for(let i=0;i<this.products.length;i++){
            this.showAll.push(false);
          }
          console.log(JSON.parse(res['_body']));
        });
      });
 this.limit = 2;
    }
  }
  onAddSection() {
    this.sectionEdit = true;
    const control = <FormArray>this.BForm.controls.section;
    control.push(
      this._fb.group({
        sectionTitle: [''],
        sectionContent: [''],
        sectionImage: []
      })
    );
  }
  setSection() {
    const control = <FormArray>this.BForm.controls.section;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.companyService.companyData.section.forEach(x => {
      control.push(
        this._fb.group({
          sectionImage: x.sectionImage,
          sectionTitle: x.sectionTitle,
          sectionContent: x.sectionContent


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
    const control = <FormArray>this.BForm.controls.section;
    control.removeAt(index);
  }

  editbio() {
    this.bioEdit = !this.bioEdit;
  }
  onsectionImagePick(event, name, index) {
    console.log(event)
    this.file = <File>event.target.files[0];
    const fdata = new FormData();
    fdata.append(name, this.file);
    // this.spinner.show();
    this.imgUpload.uploadImg(fdata).subscribe(res => {
      const updata = new FormData();
      const url = res['_body'];
      let control = <FormArray>this.BForm.controls.section;
      this.companyService.companyData.section=control.value;
      this.companyService.companyData.section[index].sectionImage = url;
      this.setSection();


      // this.spinner.hide();
    });
    // control.value[index].sectionImage
  }

  uploadCompanyImage(event,name){
    this.file=<File>event.target.files[0];
    const fdata=new FormData();
    fdata.append(name,this.file);
    this.spinner.show();
    this.imgUpload.uploadImg(fdata).subscribe(res=>{
      const formdata=new FormData();
        const url=res['_body'];
        formdata.append(name,url);
      if(name==='companyLogo' || name==='coverImage' || name==='infoImage'){
          this.companyService.UpdateCompany(formdata).subscribe(res=>{
              this.companyService.companyData.companyLogo=JSON.parse(res['_body']).companyLogo;
              this.companyService.companyData.infoImage=JSON.parse(res['_body']).infoImage;
              this.companyService.companyData.coverImage=JSON.parse(res['_body']).coverImage;
              this.spinner.hide();
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
      }else{
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
    })

  }

  editProduct(id) {
    this.router.navigate(['/productEdit/' + id]);
  }
  EditBpage() {
    this.router.navigate(['company-form2']);
  }
  showTwo() {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'info' }
    });
    this.two = true;
this.three = false;
this.four = false;
this.one = false
    this.type = 'info';

  }
  showThree() {
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      this.products = JSON.parse(res['_body']);
    });
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'product' }
    });
    this.one = false
    this.two = false;
this.three = true;
this.four = false;
    this.type = 'product';
  }
  showFour() {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'contact' }
    });
    this.one = false
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
    this.companyService.UpdateCompany(formData).subscribe(res => {
      this.companyService.companyData.website = JSON.parse(res['_body']).website;
      this.companyService.companyData.workingHours = JSON.parse(
        res['_body']
      ).workingHours;
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

  onfollow() {
    this.Follower = true;
    console.log(this.comapnyId)
    this.follows.addFollow(this.comapnyId).subscribe(res => {
      //  this.companyService.companyData.followers;
      console.log(this.companyFollowers.length)
       console.log(res)
       });

  }
  onunfollow() {
    this.Follower = false;
    this.follows.Unfollow(this.comapnyId).subscribe(res => {
    // this.companyService.companyData.followers;
    console.log(this.companyFollowers.length);
    console.log(res)
    });
  }

  onSubmit() {
    this.sectionEdit = false;
    const sectionForm = new FormGroup({
      section: new FormControl(this.BForm.value.section)
    });
    this.companyService.UpdateCompany(sectionForm.value).subscribe(res => {
      this.companyService.companyData.section = JSON.parse(res['_body']).section;
    });
  }
  onadeleteImg(item) {
        const i = this.certification.indexOf(item);
        console.log(i)
        if(confirm('Are you sure you want to delete')){
          this.certification.splice(i, 1);
          let certiForm = new FormGroup({
            certification: new FormControl(this.certification)
          });
          this.companyService
            .UpdateCompany(certiForm.value)
            .subscribe(response => {
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
              this.companyService.companyData.companyImage = JSON.parse(
                response['_body']
              ).companyImage;
            });
        }


  }
  addBookmark(id) {
    this.bookmark = true;
    this.bookmarkService.addCompanyBookmark(id).subscribe(res => {
    });
  }
  removeBookmark(id) {
    this.bookmark = false;
    this.bookmarkService
      .DeleteBookmarkCompany(id)
      .subscribe(res => {
      });
  }
  onAddproductTogroup(key) {
console.log(key);
this.productService.key = key;
const dialogConfig = new MatDialogConfig();
dialogConfig.autoFocus = true;
dialogConfig.width = '80%';
this.dialog.open(ProductSelectComponent, dialogConfig);
  }
  onRemoveproduct(id, ip , key) {
    console.log(key);
    console.log(this.products[ip].sortedProducts);
    this.products[ip].sortedProducts.splice(id, 1);
    console.log(this.products[ip].sortedProducts);
  }
onDeletegroup(name) {
  let i = this.products.indexOf(name);
  this.products.splice(i, 1);
  console.log(this.products);
  this.productService.token = this.storage.get('token');
  console.log(name);
this.productService.deletegroup(name).subscribe(res => {
  // console.log(JSON.parse(res['_body']));
});
}

onShowAllProduct(index){
  console.log(this.showAll[index])
  console.log(index)
  this.showAll[index]= !this.showAll[index]
}
}
