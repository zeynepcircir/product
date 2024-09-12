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
import { InputTextModule } from "primeng/inputtext";
import {FileUploadModule} from 'primeng/fileupload';
import { DropdownModule } from "primeng/dropdown";
import { ProductAddComponent } from './product-add/product-add.component';
import { PaginatorModule } from 'primeng/paginator';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    ProductComponent,
    ProductTableComponent,
    ProductEditComponent,
    ProductAddComponent
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
    ProgressSpinnerModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    RatingModule,
    PaginatorModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [DialogService,ConfirmationService,MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule { }
