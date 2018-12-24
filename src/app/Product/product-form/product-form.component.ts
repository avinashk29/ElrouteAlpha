import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder, FormArray} from '@angular/forms';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm:  FormGroup;
  productInfoForm: FormGroup;
  imagePreview;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this._fb.group({
      productName: [],
     productImage: [],
     shortDescription: [],
     productInfo: this._fb.array([this.addProductInfoGroup()]),
     price: [],
     minPrice: [],
     maxPrice: [],
     moq: [],
     industry: [],
     category: [],
     tfCode: []
    });
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
      productSpecification: [],
      specificationContent: [],
      fileds: this._fb.array([this.addFiledsGroup()])
    });
  }
  addFiledsGroup() {
  return this._fb.group({
    fieldName: [],
    fieldDes: []
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
  }
}
