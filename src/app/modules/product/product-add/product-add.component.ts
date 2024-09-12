import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductModel } from 'src/app/models/ProductModel';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  previewImage: string | ArrayBuffer | null = null; 
  profileForm = new FormGroup({
    category: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''), // Görsel URL'si veya base64
    price: new FormControl(''),
    title: new FormControl(''),
    rating: new FormControl(0) // Başlangıç rating değeri 0
  });

  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];  // Seçilen ilk dosyayı alıyoruz
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
      reader.readAsDataURL(file);  // Dosyayı base64 formatına çeviriyoruz
    }
  }
  

  save() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.getRawValue() as ProductModel;
      this.productService.addProduct(formValue); // Ürünü ekleyip kaydediyoruz
      this.dynamicDialogRef.close(formValue); // Formu kapatıyoruz
    }
  }
  cancel() {
    this.dynamicDialogRef.close();
  }
}
