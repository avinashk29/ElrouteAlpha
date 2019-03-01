import {
  Component,
  OnInit,
  Inject,
  NgZone
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyServiceService } from '../../Service/company-service.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ProductServiceService } from '../../Service/product-service.service';
import { FeedService } from '../../Service/feed-service.service';
import 'rxjs/add/operator/filter';
import { UserService } from '../../Service/user-services.service';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
// import { NgxUiLoaderSe÷rvice } from 'ngx-ui-loader';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { BookmarkServices } from 'src/app/Service/bookmark-services.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
  companyType;
  certification = [];
  country;
  Image;
  industry;
  mobile;
  address;
  yearEstd;
  companySize;
  companyFollowers = [];
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
  logo = false;
  infoImg = false;
  img = false;
  shortIntro;
  shortbioEdit = false;
  noFeeds = false;
  myCompany = false;
  editwebsite = false;
  editSocialLinks = false;
  editworkingHours = false;
  editshortIntro = false;
  imagePreview;
  infoImage;
  facebook;
  section = [];
  socialLink = [];
  companyImage = [];
  bioEdit = false;
  userBookmark;
  basicDetail = false;
  linkEdit = false;
  follower;

  BForm: FormGroup;

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
    private ngZone: NgZone,
    private spinner: Ng4LoadingSpinnerService
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
    if (this.comapnyId === this.mycompanyId) {
      this.myCompany = true;
    } else {
      this.myCompany = false;
    }
    this.companyService.token = this.storage.get('token');
    this.userService.token = this.storage.get('token');
    this.comapnyId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams
      .filter(paramas => paramas.urltype)
      .subscribe(paramas => {
        this.type = paramas.urltype;
        this.companyService.GetoneCompany(this.comapnyId).subscribe(res => {
          // this.companyService = JSON.parse(res['_body']);
          //  (this.companyService.city);
          //  (this.companyService.companyName);
          //  (JSON.parse(res['_body']));


          this.companyService.companyName = JSON.parse(
            res['_body']
          ).companyName;
          this.companyService.category = JSON.parse(res['_body']).category;
          this.companyService.city = JSON.parse(res['_body']).city;
          this.companyService.companyEmail = JSON.parse(
            res['_body']
          ).companyEmail;
          this.companyService.country = JSON.parse(res['_body']).country;
          this.companyService.industry = JSON.parse(res['_body']).industry;
          (this.companyService.shortIntro = JSON.parse(
            res['_body']
          ).shortIntro),
            this.companyService.website = JSON.parse(res['_body']).website;
          this.companyService.workingHours = JSON.parse(
            res['_body']
          ).workingHours;
          this.companyService.yearEstd = JSON.parse(res['_body']).yearEstd;
          this.companyService.companyType = JSON.parse(res['_body']).companyType;
          this.companyService.address = JSON.parse(res['_body']).address;
          this.companyService.companySize = JSON.parse(
            res['_body']
          ).companySize;
          this.companyService.coverImage = JSON.parse(res['_body']).coverImage;

          this.companyService.companyLogo = JSON.parse(
            res['_body']
          ).companyLogo;
          this.companyService.infoImage = JSON.parse(res['_body']).infoImage;
          this.companyService.section = JSON.parse(res['_body']).section;
          this.certification = JSON.parse(res['_body']).certification;
          this.companyImage = JSON.parse(res['_body']).companyImage;
          this.companyFollowers = JSON.parse(res['_body']).followers.length;
          this.facebook = JSON.parse(res['_body']).facebook;



          // this.BForm.patchValue({
          //  website: JSON.parse(res['_body']).website,
          //  Image: JSON.parse(res['_body']).Image,
          //  workingHours: JSON.parse(res['_body']).workingHours,
          //  shortIntro: JSON.parse(res['_body']).shortIntro,
          // //  socialLinks:JSON.parse(res['_body']).socialLinks
          // });

          this.setSection();

          if (this.companyLogo) {
            this.logo = true;
          }
          if (this.infoImage) {
            this.infoImg = true;
          }
          if (this.Image) {
            this.img = true;
          }
        });
      });
    this.mycompanyId = this.storage.get('companyId');
    if (this.type === 'product') {
      this.productService.getProduct(this.comapnyId).subscribe(res => {
        this.products = JSON.parse(res['_body']);
      });
      this.type = 'product';
    }
    if (this.type === 'info') {
      this.type = 'info';
    }
    if (this.type === 'contact') {
      this.type = 'contact  ';
    }

  }

  ngOnInit() {
    this.imgUpload.token = this.storage.get('token');
    this.feedService.token = this.storage.get('token');
    this.userService.getUserData().subscribe(res => {
      this.userInfo = JSON.parse(res['_body']).following;
      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.userInfo[i] === this.comapnyId) {
          this.Follower = true;
        } else {
          this.Follower = false;
        }
      }
    });
    this.companyService.token = this.storage.get('token');
    this.productService.token = this.storage.get('token');
    this.mycompanyId = this.storage.get('companyId');
    this.token = this.storage.get('token');
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
        if (this.comapnyId == this.userBookmark[i]) {
          this.bookmark = true;
        } else {
          this.bookmark = false;
        }
      }
    });
  }
  onAddSection() {
    this.sectionEdit = true;
    let control = <FormArray>this.BForm.controls.section;
    control.push(
      this._fb.group({
        sectionTitle: [''],
        sectionContent: [''],
        sectionImage: []
      })
    );
  }
  setSection() {
    let control = <FormArray>this.BForm.controls.section;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.companyService.section.forEach(x => {
      control.push(
        this._fb.group({
          sectionTitle: x.sectionTitle,
          sectionContent: x.sectionContent,
          sectionImage: x.sectionImage
        })
      );
    });
  }
  gotoTimeline() {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'default' }
    });
  }
  onDelete(index) {
    let control = <FormArray>this.BForm.controls.section;
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
      this.companyService.section=control.value;  
      this.companyService.section[index].sectionImage = url;
      this.setSection();
      
      
      // this.spinner.hide();
    });
    // control.value[index].sectionImage
  }

  PickInfoImage(event, name) {
    this.file = <File>event.target.files[0];
    const fdata = new FormData();
    fdata.append(name, this.file);
    this.spinner.show();
    this.imgUpload.uploadImg(fdata).subscribe(res => {
      const updata = new FormData();
      const url = res['_body'];
      if (name === 'certification') {
        this.certification.push(url);
        let certiForm = new FormGroup({
          certification: new FormControl(this.certification)
        });
        this.companyService
          .UpdateCompany(certiForm.value)
          .subscribe(response => {
            this.companyService.certification = JSON.parse(
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
            this.companyService.companyImage = JSON.parse(
              response['_body']
            ).companyImage;
          });
        this.spinner.hide();
      }
    });
  }

  onImagePick(event, name) {
    this.imgUpload.updateCompanyImage(event, name);
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
    this.type = 'info';
  }
  showThree() {
    this.productService.getProduct(this.comapnyId).subscribe(res => {
      this.products = JSON.parse(res['_body']);
    });
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'product' }
    });
    this.type = 'product';
  }
  showFour() {
    this.router.navigate(['/companyPage/' + this.comapnyId], {
      queryParams: { urltype: 'contact' }
    });
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
      this.website = JSON.parse(res['_body']).website;
      this.companyService.workingHours = JSON.parse(
        res['_body']
      ).workingHours;
      this.companyService.shortIntro = JSON.parse(res['_body']).shortIntro;
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
    this.follows.addFollow(this.comapnyId).subscribe(res => {
    });
  }
  onunfollow() {
    this.Follower = false;
    this.follows.Unfollow(this.comapnyId).subscribe(res => {
    });
  }

  onSubmit() {
    this.sectionEdit = false;
    const sectionForm = new FormGroup({
      section: new FormControl(this.BForm.value.section)
    });
    this.companyService.UpdateCompany(sectionForm.value).subscribe(res => {
      this.companyService.section = JSON.parse(res['_body']).section;
    });
  }
  onadeleteImg(item) {
 
      if (confirm("Are you sure to delete ")){
        const i = this.certification.indexOf(item);
        console.log(i)
        this.certification.splice(i, 1);
        let certiForm = new FormGroup({
          certification: new FormControl(this.certification)
        });
        this.companyService
          .UpdateCompany(certiForm.value)
          .subscribe(response => {
            this.companyService.certification = JSON.parse(
              response['_body']
            ).certification;
          });
      }
  }
  onDeleteCompanyImg(item, index) {

      if (confirm("Are you sure to delete ", text)){
        const i = this.companyImage.indexOf(item);
        this.companyImage.splice(item, 1);
        let companyImage = new FormGroup({
          companyImage: new FormControl(this.companyImage)
        });
        this.companyService
          .UpdateCompany(companyImage.value)
          .subscribe(response => {
            this.companyService.companyImage = JSON.parse(
              response['_body']
            ).companyImage;
          });
      }
  }
  addBookmark() {
    this.bookmark = true;
    this.bookmarkService.addCompanyBookmark(this.comapnyId).subscribe(res => {
    });
  }
  removeBookmark() {
    this.bookmark = false;
    this.bookmarkService
      .DeleteBookmarkCompany(this.comapnyId)
      .subscribe(res => {
      });
  }
}
