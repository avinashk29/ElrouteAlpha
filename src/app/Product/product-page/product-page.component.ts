import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  heading='NATURAL INDIGO';
  tab1='Dyes';
  tab2='Product';
  model='AB15520';

  products;
  constructor(private productService:ProductServiceService, @Inject(LOCAL_STORAGE) private storage:WebStorageService) { 
    this.products = [
			{
				setup: "What did the cheese say when it looked in the mirror?",
        punchline: "Hello-Me (Halloumi)",
      },
      {
				setup: "What did the cheese say when it looked in the mirror?",
        punchline: "Hello-Me (Halloumi)",
      },
      {
				setup: "What did the cheese say when it looked in the mirror?",
        punchline: "Hello-Me (Halloumi)",
      },
      
		];

  }
  panelOpenState = false;


  ngOnInit() {
    this.productService.token=this.storage.get('token');
    this.productService.getProduct().subscribe(res=>{
        console.log(res);
    })
  }

}
