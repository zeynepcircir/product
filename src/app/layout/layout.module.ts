import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { ProductMainComponent } from './product-main/product-main.component';


@NgModule({
  declarations: [
    ProductHeaderComponent,
    ProductMainComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
