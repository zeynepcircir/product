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
previewImage: string | ArrayBuffer | null = null; 
  uploadedFiles: any[] = []
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

  onUpload(event: any) {
    const file = event.files[0];  // İlk dosyayı alıyoruz
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.previewImage = reader.result;  // Görselin önizlemesi için
          this.profileForm.patchValue({
            image: reader.result  // Görseli base64 formatında form verisine ekliyoruz
          });
        }
      };
      reader.readAsDataURL(file);  // Görseli base64 formatına çeviriyoruz
    }
  }
  
  
}

