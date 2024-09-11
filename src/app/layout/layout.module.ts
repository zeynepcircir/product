import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { ProductMainComponent } from './product-main/product-main.component';
import { ProductModule } from '../modules/product/product.module';


@NgModule({
  declarations: [
    ProductHeaderComponent,
    ProductMainComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ProductModule
  ]
})
export class LayoutModule { }
