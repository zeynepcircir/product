import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Category, ProductModel } from 'src/app/models/ProductModel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  uploadedFiles: any[] = []
  previewImage: string | ArrayBuffer | null = null; 

  categoryOptions = Object.keys(Category)
  .filter(a => a != "AllProducts").map(key => ({
    label: Category[key as keyof typeof Category],
    value: Category[key as keyof typeof Category]
  }));


  profileForm = new FormGroup({
    category: new FormControl('', Validators.required), 
    
    description: new FormControl('', [
      Validators.required, 
      Validators.maxLength(500),
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
    private messageService: MessageService
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
  
  validateCategoryInput(event: any) {
    const input = event.target.value;
    const validInput = input.replace(/[^a-zA-Z]/g, '').slice(0, 5);
    this.profileForm.patchValue({ category: validInput }, { emitEvent: false });
  }
  

  save() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.getRawValue() as ProductModel;
      this.dynamicDialogRef.close(formValue);
      this.messageService.add({severity: 'success', summary: 'Success', detail: `${formValue.title} added successfully.`});
    }
  }
  cancel() {
    this.dynamicDialogRef.close();
  }
}