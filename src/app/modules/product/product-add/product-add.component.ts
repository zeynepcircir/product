import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductModel } from 'src/app/models/ProductModel';

// Kategori Enum Tanımlaması
export enum Category {
  MobilePhones = 'Mobile Phones',
  Laptops = 'Laptops',
  Cameras = 'Cameras',
  AudioHeadphones = 'Audio & Headphones',
  Tablets = 'Tablets'
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  uploadedFiles: any[] = [];
  previewImage: string | ArrayBuffer | null = null;

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
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
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

  save() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.getRawValue() as ProductModel;
      this.productService.addProduct(formValue);
      this.dynamicDialogRef.close(formValue);
    }
  }

  cancel() {
    this.dynamicDialogRef.close();
  }
}
