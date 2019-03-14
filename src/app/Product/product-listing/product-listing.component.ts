import { Component, OnInit,Inject } from '@angular/core';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { CompanyServiceService } from 'src/app/Service/company-service.service';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  companyid;
  results=[];
  showForm = false;
  showEdit = false;
  group =false;
  selectedProduct = [];
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService,
  private productService:ProductServiceService,private router:Router,private companyService:CompanyServiceService) {
    this.companyid=this.storage.get('companyId');
   }
GroupForm = new FormGroup({
  groupName: new FormControl(''),
  products: new FormControl('')
});
  ngOnInit() {
    this.productService.token=this.storage.get('token');
    this.productService.getProduct(this.companyid).subscribe(res=>{
      this.productService.productData=JSON.parse(res['_body']);
      this.results = this.productService.productData;
      //console.log(this.results);
    })

  }
  editProduct(id) {
     this.router.navigate(['/product/'] , {queryParams: {productId: id}});
  }
  getGroupproduct(id) {

    var matched=false;
    if(this.selectedProduct.length){
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
         } else{
          this.selectedProduct.push(id);
          //console.log(this.selectedProduct);
          //console.log('Product added');
         }
  }
  onSubmit(){
   this.productService.token = this.storage.get('token');
    this.GroupForm.value.products = this.selectedProduct;
    this.productService.groupProduct(this.GroupForm.value).subscribe(res => {
      //console.log(JSON.parse(res['_body']));
    });
  }
}
