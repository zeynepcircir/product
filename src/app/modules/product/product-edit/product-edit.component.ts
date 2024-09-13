import { Component, OnInit } from '@angular/core';
import { ProductTableComponent } from '../product-table/product-table.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, ProductModel } from 'src/app/models/ProductModel';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  providers: [DynamicDialogRef, DynamicDialogConfig]
})
export class ProductEditComponent implements OnInit {
previewImage: string | ArrayBuffer | null = null; 
  uploadedFiles: any[] = []
  product: ProductModel | null = null;
  value1: string = '';


   // Dropdown için Kategori Seçenekleri
  categoryOptions = Object.keys(Category).map(key => ({
    label: Category[key as keyof typeof Category],
    value: Category[key as keyof typeof Category]
  }));

  profileForm = new FormGroup({
    category: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9 .,!?]*$')
    ]),
    image: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.maxLength(10)
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z0-9 ]*$')
    ]),
    rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)])
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

  onUpload(event: any) {
    const file = event.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.previewImage = reader.result; 
          this.profileForm.patchValue({
            image: reader.result  
          });
        }
      };
      reader.readAsDataURL(file);  
    }
  }
  
  
}

