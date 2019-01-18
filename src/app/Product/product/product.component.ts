import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup , FormBuilder, FormArray, Validator, Validators} from '@angular/forms';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router } from '@angular/router';
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
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _fb: FormBuilder, public productService: ProductServiceService, public router: Router, public notification: ToastrService) {
      this.companyId =  this.storage.get('companyId');
     }
  ngOnInit() {
    this.editproductForm = this._fb.group({
      productName: ['', [Validators.required] ],
     productImage: [''],
     shortDescription: [''],
     productInfo: this._fb.array([this.addProductInfoGroup()]),
     price: [''],
     minPrice: [''],
     maxPrice: [''],
     moq: [''],
     industry: [''],
     category: [''],
     tfCode: ['']
    });
    this.productService.token = this.storage.get('token');
    
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editproductForm.patchValue({productImage: file});
    this.editproductForm.get('productImage').updateValueAndValidity();
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
    if (this.editproductForm.valid) {
      console.log(this.editproductForm.value);
      const productData = this.editproductForm.value;
      this.productService.addProduct(productData).subscribe(res => {
        console.log(JSON.parse(res['_body']));
      });
      this.router.navigate(['/companyPage/' + this.companyId ]);
  this.notification.success('Product Added');
    } else {
      this.notification.error('Enter Valid Deatils');
    }

  }
}
