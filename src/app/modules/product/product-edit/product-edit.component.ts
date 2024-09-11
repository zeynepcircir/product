import { Component, OnInit } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/ProductModel';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  product: ProductModel | null = null;
  value1: string = '';

  profileForm = new FormGroup({
    category: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    title: new FormControl(''),
    id: new FormControl(''),
  });

  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    dynamicDialogConfig: DynamicDialogConfig
  ) {
    console.log(dynamicDialogConfig.data);
    this.product = dynamicDialogConfig.data;
    this.profileForm.patchValue(dynamicDialogConfig.data);
  }

  ngOnInit(): void {}

  selectProduct({ product }: { product: ProductTableComponent }) {}

  cancel() {
    this.dynamicDialogRef.close();
  }

  save() {
    this.dynamicDialogRef.close(this.profileForm.getRawValue());
  }

}
