import { Component, OnInit, Inject } from '@angular/core';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {
key;
companyId;
selectedProduct = [];
products;
GroupForm = new FormGroup({
  groupName: new FormControl(''),
  products: new FormControl('')
});
  constructor(public productService: ProductServiceService, @Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public router: Router,
   private spinner: Ng4LoadingSpinnerService,
   public dialogRef: MatDialogRef <ProductSelectComponent>) { }

  ngOnInit() {
    this.key = this.productService.key;
    console.log(this.key);
    this.companyId = this.storage.get('companyId');
    console.log(this.productService.key);
    this.productService.token = this.storage.get('token');
    this.productService.getProduct(this.companyId).subscribe(res => {
      this.productService.productData = JSON.parse(res['_body']);
      console.log(this.productService.productData);
      // // this.results = this.productService.productData;
      for(let i=0;i<this.productService.productData.length;i++){
        if(this.productService.productData[i].key==='others'){
          //console.log(JSON.parse(res['_body'])[i].sortedProducts);
          this.products = JSON.parse(res['_body'])[i].sortedProducts;
          console.log(this.products);
        }
      }


    });
  }

   getGroupproduct(id) {

    var matched=false;
    if (this.selectedProduct.length) {
      for (let i = 0; i < this.selectedProduct.length; i++) {
        // //console.log(this.selectedProduct[i]);
        // //console.log(id);
        if ( this.selectedProduct[i] === id ) {
          //console.log('same');
          const index = this.selectedProduct.indexOf(id);
          //console.log(index);
         this.selectedProduct.splice(i, 1);
          //console.log(this.selectedProduct);
          matched = true;
          //console.log('Product removed');
          break;
        }
       }
       if (matched === false) {

          this.selectedProduct.push(id);
 }
       //console.log(this.selectedProduct);
         } else {
          this.selectedProduct.push(id);
          //console.log(this.selectedProduct);
          //console.log('Product added');
         }

  }
  onSubmit() {
    this.spinner.show();
    this.productService.token = this.storage.get('token');
    if (this.productService.key) {
      this.GroupForm.value.groupName = this.productService.key;
      this.GroupForm.value.products = this.selectedProduct;
      //console.log(this.GroupForm.value);
      this.productService.updateGroup(this.GroupForm.value).subscribe(res => {
        //console.log(res);
      });
    }

if (!this.productService.key) {
  this.GroupForm.value.products = this.selectedProduct;
  //console.log(this.GroupForm.value);
  this.productService.groupProduct(this.GroupForm.value).subscribe(res => {
    //console.log(res);
    //console.log(JSON.parse(res['_body']));

    this.spinner.hide();
  });
}

this.dialogRef.close(ProductSelectComponent);
this.router.navigate(['/companyPage/' + this.companyId], {
  queryParams: { urltype: 'product'}

});
   }
}
