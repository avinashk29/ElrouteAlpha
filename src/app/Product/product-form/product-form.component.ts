import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup , FormBuilder, FormArray, Validators} from '@angular/forms';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import { UserService } from 'src/app/Service/user-services.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm:  FormGroup;
  productInfoForm: FormGroup;
  imagePreview;
  companyId;
  urltype;
  url;
  companyid
  companyName
  productInfo= [
    {
        "specificationContent" : "",
        "productSpecification" : "",

        "fields" : [
            {
                "fieldDes" : "",
                "fieldName" : "",

            }
        ]
    }
];
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private userService:UserService,
    private _fb: FormBuilder,private companyService:CompanyServiceService, public productService: ProductServiceService,private imgupload:ImageUploadService, public router: Router, public notification: ToastrService) {
      this.companyId =  this.storage.get('companyId');
     }

  ngOnInit() {
    this.imgupload.token=this.storage.get('token');
    this.productForm = this._fb.group({
      productName: ['', [Validators.required] ],
     Image: [],
     shortDescription: [''],
     productInfo: this._fb.array([]),
     price: [''],
     minPrice: [''],
     maxPrice: [''],
     moq: [''],
     industry: [''],
     category: [''],
     tfCode: [''],

    });
    this.productService.token = this.storage.get('token');
    this.setProductInfo();
  }
  onImagePick(event, name) {
    this.companyid=this.storage.get('companyId')
    this.companyService.GetoneCompany(this.companyid).subscribe(res=>{
      this.companyName=JSON.parse(res['_body']).companyName;
    })
    const file = <File>event.target.files[0];
    this.productForm.patchValue({Image: file});
    this.productForm.get('Image').updateValueAndValidity();
    const reader = new FileReader();
      reader.onload = () => {
         this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    const fdata= new FormData();
    fdata.append(name,file)
      this.imgupload.uploadImg(fdata).subscribe(res=>{
        const url=res['_body']
        this.productForm.patchValue({
          Image: [url]
        })

      })
   }

   addProductInfo() {
    let control =  <FormArray>this.productForm.controls.productInfo;
    control.push(
      this._fb.group({
        productSpecification: [''],
        specificationContent: [''],
        fields: this._fb.array([])

      })
    )
  }

  addNewField(control) {
  control.push(
    this._fb.group({
      fieldName: [''],
    fieldDes: ['']
    })
  )
  }

  setProductInfo(){
    let control = <FormArray>this.productForm.controls.productInfo;
  this.productInfo.forEach(x => {
    control.push(this._fb.group({
      productSpecification:x.productSpecification,
      specificationContent:x.specificationContent,
      fields: this.setField(x) }
      )
      )
  })
  }

  deleteProductInfo(index) {
    let control = <FormArray>this.productForm.controls.productInfo;
    control.removeAt(index)
  }

  setField(x){
    let arr = new FormArray([])
    x.fields.forEach(y => {
      arr.push(this._fb.group({
        fieldName: y.fieldName,
    fieldDes: y.fieldDes
      }))
    })
    return arr;
  }
  deleteField(control,index){
    control.removeAt(index);
  }


  onSubmit() {
     this.productForm.value.companyName=this.companyName;
      this.productService.addProduct(this.productForm.value).subscribe(res => {
        // this.productService.productData = JSON.parse(res['_body']);
        this.userService.sendData(res);
        this.router.navigate(['/companyPage/' + this.companyId ], {queryParams: {urltype: 'product'}});
        this.notification.success('Product Added');
      });
;


  }
}
