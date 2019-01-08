import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup , FormBuilder, FormArray} from '@angular/forms';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm:  FormGroup;
  productInfoForm: FormGroup;
  imagePreview;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private _fb: FormBuilder, public productService: ProductServiceService) { }

  ngOnInit() {
    this.productForm = this._fb.group({
      productName: [''],
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
    this.productForm.patchValue({productImage: file});
    this.productForm.get('productImage').updateValueAndValidity();
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
    return <FormArray>this.productForm.get('productInfo');
  }
  get filedsArray() {
    return <FormArray>this.productInfoForm.get('fileds');
  }
  addProductInfo() {
    this.productInfoArray.push(this.addProductInfoGroup());
  }
  onSubmit() {
    console.log(this.productForm.value);
    const productData = this.productForm.value;
    this.productService.addProduct(productData).subscribe(res => {
      console.log(JSON.parse(res['_body']));
    });
  }
}
