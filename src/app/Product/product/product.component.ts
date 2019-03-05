import { Component, OnInit,Inject, NgZone } from '@angular/core';
import {FormGroup , FormBuilder, FormArray, Validator, Validators} from '@angular/forms';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImageUploadService } from 'src/app/Service/imageupload-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productInfo;
  productForm:  FormGroup;
  imagePreview;
  companyId;
  productId;
  url;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _fb: FormBuilder, public productService: ProductServiceService, private imgupload: ImageUploadService,
     public router: Router, public notification: ToastrService, private route: ActivatedRoute, public ngZone: NgZone) {
      this.companyId =  this.storage.get('companyId');
      // this.productId = route.snapshot.paramMap.get('id');
      this.route.queryParams.filter(params => params.productId).subscribe(params => {
        this.productService.productId = params.productId;
        console.log('working');

        this.productService.getOneProduct(this.productService.productId).subscribe(res => {

          this.productService.productData.productInfo=JSON.parse(res['_body']).productInfo;
            this.productForm.patchValue(JSON.parse(res['_body']));
            this.imagePreview = JSON.parse(res['_body']).Image
          this.setProductInfo();
         });
});


      this.productForm = this._fb.group({
      productName: ['', [Validators.required] ],
       Image: [''],
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


     }

  ngOnInit() {
    this.imgupload.token = this.storage.get('token');
    this.productService.token = this.storage.get('token');

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
  this.productService.productData.productInfo.forEach(x => {
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
      const productData = this.productForm.value;
      this.productService.UpdateProduct(productData , this.productService.productId).subscribe(res => {
          console.log(res);
          this.notification.success('Product Updated');
          this.router.navigate(['/companyPage/' + this.companyId ], {queryParams: {urltype: 'product'}});
      });
} else {
      this.notification.error('Enter Valid Deatils');
    }
  }

  onImagePick(event, name) {
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
}
