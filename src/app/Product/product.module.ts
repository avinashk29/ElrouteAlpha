import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../Product/product-form/product-form.component';
import { ReactiveFormsModule} from '@angular/forms';
import { ProductListingComponent } from './product-listing/product-listing.component';
@NgModule({
  declarations: [ProductFormComponent, ProductListingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
