import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductModel } from 'src/app/models/ProductModel';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  uploadedFiles: any[] = []
  previewImage: string | ArrayBuffer | null = null; 

  profileForm = new FormGroup({
    // Required, sadece metin kabul edilir
    category: new FormControl('', Validators.required), 
    
    // Required, max 500 karakter, sadece metin
    description: new FormControl('', [
      Validators.required, 
      Validators.maxLength(500),
      Validators.pattern('^[a-zA-Z0-9 .,!?]*$') // Alfanumerik ve noktalama işaretleri
    ]), 
    
    // Required (Görsel yükleme)
    image: new FormControl('', Validators.required), 
    
    // Required, sadece rakam, max 10 karakter
    price: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[0-9]+$'), // Sadece rakam kabul edilir
      Validators.maxLength(10)
    ]), 
    
    // Required, max 100 karakter
    title: new FormControl('', [
      Validators.required, 
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9 ]*$') // Sadece alfanumerik karakterler kabul edilir
    ]), 
    
    // Required, 0 ile 5 arasında olmalı
    rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]) 
  });


  
  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.files[0];  // Seçilen ilk dosyayı alıyoruz
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
  
  validateCategoryInput(event: any) {
    const input = event.target.value;
    const validInput = input.replace(/[^a-zA-Z]/g, '').slice(0, 5);
    this.profileForm.patchValue({ category: validInput }, { emitEvent: false });
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
