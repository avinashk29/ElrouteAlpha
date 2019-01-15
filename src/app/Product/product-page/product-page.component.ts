import { Component, OnInit, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductServiceService} from '../../Service/product-service.service';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService,
   public route: ActivatedRoute, public product: ProductServiceService) {
    this.id = this.route.snapshot.paramMap.get('_id');
    console.log(this.id);
  this.product.token = this.storage.get('token');
  }
  panelOpenState = false;
id;

  ngOnInit() {
this.product.getOneproduct(this.id).subscribe(res => {
  console.log(JSON.parse(res['_body']));
});
  }

}
