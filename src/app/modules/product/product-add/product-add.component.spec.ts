import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductAddComponent } from './product-add.component';
import { ProductService } from 'src/app/services/product.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let dialogRefSpy: jasmine.SpyObj<DynamicDialogRef>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['addProduct']);
    dialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ProductAddComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        RatingModule // Rating modülü eklendi
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: DynamicDialogRef, useValue: dialogRefSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close the dialog when the cancel method is called', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should not call the addProduct method if the form is invalid', () => {
    component.profileForm.controls['title'].setValue(''); 
    component.profileForm.controls['category'].setValue(''); 
    component.profileForm.controls['rating'].setValue(0); 
    component.profileForm.controls['price'].setValue(''); 
    component.save();
    expect(productServiceSpy.addProduct).not.toHaveBeenCalled();
  });
});
