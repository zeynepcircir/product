import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { TableModule } from 'primeng/table';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [
    ProductComponent,
    ProductTableComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule { }
