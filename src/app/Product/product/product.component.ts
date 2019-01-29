import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup , FormBuilder, FormArray, Validator, Validators} from '@angular/forms';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  editproductForm:  FormGroup;
  productInfoForm: FormGroup;
  imagePreview;
  companyId;
  productId;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _fb: FormBuilder, public productService: ProductServiceService, public router: Router, public notification: ToastrService,private route:ActivatedRoute) {
      this.companyId =  this.storage.get('companyId');
      this.productId=route.snapshot.paramMap.get('id');
     }
  ngOnInit() {
    this.editproductForm = this._fb.group({
      productName: ['', [Validators.required] ],
     productImage: [''],
     shortDescription: [''],
     productInfo: this._fb.array([this.addProductInfoGroup()]),
     price: [''],
     minPrice: [null],
     Image: [''],
     maxPrice: [null],
     moq: [ null],
     industry: [''],
     category: [''],
     tfCode: ['']
    });
    this.productService.token = this.storage.get('token');
    this.productService.getOneProduct(this.productId).subscribe(res=>{
      console.log(JSON.parse(res['_body']));
        this.editproductForm.patchValue({
          productName:JSON.parse(res['_body']).productName,
          Image:JSON.parse(res['_body']).Image,
          shortDescription:JSON.parse(res['_body']).shortDescription,
          price:JSON.parse(res['_body']).price,
          minPrice:JSON.parse(res['_body']).minPrice,
          maxPrice:JSON.parse(res['_body']).maxPrice,
          moq:JSON.parse(res['_body']).moq,
          industry:JSON.parse(res['_body']).industry,
          category:JSON.parse(res['_body']).category,
          tfCode:JSON.parse(res['_body']).tfCode,

        })
        this.productInfoForm.patchValue({
              productSpecification:JSON.parse(res['_body']).productSpecification,
              specificationContent:JSON.parse(res['_body']).specificationContent
        })
    })
   
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editproductForm.patchValue({Image: file});
    this.editproductForm.get('Image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
   }
  onAdd() {
    this.filedsArray.push(this.addFiledsGroup());
  }
  addProductInfoGroup() {
    return this.productInfoForm = this._fb.group({
      productSpecification: [''],
      specificationContent: [''],
      fileds: this._fb.array([this.addFiledsGroup()])
    });
  }
  addFiledsGroup() {
  return this._fb.group({
    fieldName: [''],
    fieldDes: ['']
  });
  }
  get productInfoArray() {
    return <FormArray>this.editproductForm.get('productInfo');
  }
  get filedsArray() {
    return <FormArray>this.productInfoForm.get('fileds');
  }
  addProductInfo() {
    this.productInfoArray.push(this.addProductInfoGroup());
  }
  onSubmit() {
    console.log(this.storage.get('token'))
    if (this.editproductForm.valid) {
      //console.log(this.editproductForm.value);
      const productData = this.editproductForm.value;
      console.log(productData)
      this.productService.UpdateProduct(productData).subscribe(res => {
        console.log(JSON.parse(res['_body']));
        
      });
       this.router.navigate(['/companyPage/' + this.companyId ]);
    this.notification.success('Product updated');
    } else {
      this.notification.error('Enter Valid Deatils');
    }
  }
}
