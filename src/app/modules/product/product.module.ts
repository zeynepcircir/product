import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ProductComponent,
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TableModule
  ]
})
export class ProductModule { }
