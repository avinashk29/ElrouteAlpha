import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../Product/product-form/product-form.component';
import { ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [ProductFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
