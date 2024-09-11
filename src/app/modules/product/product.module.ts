import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { TableModule } from 'primeng/table';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ChipModule } from 'primeng/chip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



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
    ReactiveFormsModule,
    AccordionModule,
    ChipModule,
    ProgressSpinnerModule
  ],
  providers: [DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule { }
