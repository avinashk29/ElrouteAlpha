import { Component, OnInit,Inject } from '@angular/core';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { Router } from '@angular/router';


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
  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService,private productService:ProductServiceService,private router:Router) {
    this.companyid=this.storage.get('companyId')
   }

  ngOnInit() {
    this.productService.token=this.storage.get('token');
    // this.productService.getProduct(this.companyid).subscribe(res=>{
    //   this.productService.productData=JSON.parse(res['_body']);
    //   this.results = this.productService.productData;
    //   console.log(this.results);
    // })
    
  }
  editProduct(id) {
     this.router.navigate(['/product/'] , {queryParams: {productId: id}});
  }
}
