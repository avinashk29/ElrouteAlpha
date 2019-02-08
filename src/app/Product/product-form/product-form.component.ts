import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup , FormBuilder, FormArray, FormControl ,Validator, Validators} from '@angular/forms';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';

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
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _fb: FormBuilder, public productService: ProductServiceService,private imgupload:ImageUploadService, public router: Router, public notification: ToastrService) {
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
    console.log(name);
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
        console.log(url);
    
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
    // this.filedsArray.push(this.addFiledsGroup());
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
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      const productData = this.productForm.value;
      this.productService.addProduct(productData).subscribe(res => {
        console.log(JSON.parse(res['_body']));
      });
       this.router.navigate(['/companyPage/' + this.companyId ], {queryParams: {urltype: 'product'}});
  this.notification.success('Product Added');
    } else {
      this.notification.error('Enter Valid Deatils');
    }

  }
}
