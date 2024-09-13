import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {ConfirmationService, Message, MessageService, PrimeNGConfig} from 'primeng/api';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { filter } from 'rxjs';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductAddComponent } from '../product-add/product-add.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})

export class ProductTableComponent implements OnInit {

  viewMode: 'cards' | 'table' = 'cards';
  productList: ProductModel[] = [];
  categoryName: string = '';
  displayImageDialog: boolean = false;
  selectedProductModel: ProductModel | null = null;

  
  constructor(
    private primengConfig: PrimeNGConfig,
    private _productService: ProductService,
    private _route: Router,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    
  ) {
    
  }


  show(product: ProductModel) {
    this.dialogService
      .open(ProductEditComponent, {
        header: 'Edit Product: ' + product.title,
        width: '60%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
        data: product,
      })
      .onClose.subscribe((updatedProduct: ProductModel) => {
        if (updatedProduct) {
          const index = this.productList.findIndex((pr) => pr.id === product.id);
          if (index !== -1) {
            this._productService.updateProduct(product.id!, updatedProduct);
            this.productList[index] = updatedProduct;
          this.fetch()
          }
        }
      });
  }

  // Show Product Add Dialog
  showAddProductDialog() {
    this.dialogService
      .open(ProductAddComponent, {
        header: 'Add Product',
        width: '60%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
      })
      .onClose.subscribe((newProduct: ProductModel) => {
        if (newProduct) {
          this._productService.addProduct(newProduct);
          this.productList.push(newProduct);
        }
      });
  }

  ngOnInit(): void {
  this.fetch()
  }

  fetch() {
    this.primengConfig.ripple = true;
    this._activatedRoute.paramMap.subscribe((params) => {
      this.categoryName = params.get('categoryName') ?? 'all-products';
      this.getProductByCategory();
    });

    this._route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.categoryName = this._activatedRoute.snapshot.paramMap.get('categoryName') || 'all-products';
          this.getProductByCategory();
        }
      });
  }

  getProductByCategory() {
    if (this.categoryName) {
      this._productService.getCategoryProducts(this.categoryName).subscribe((filteredProducts) => {
        this.productList = filteredProducts;
      });
    } else {
      this._productService.getProducts().subscribe((products) => {
        this.productList = products;
      });
    }
  }

  updateRating(product: ProductModel) {
    this._productService.updateProduct(product.id!, product); 
  }

  
  confirmDelete(product: any) {
    if (!product || !product.id) {
      return;  // Ürün geçersizse işlemi sonlandır
    }
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${product.title}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Kullanıcı silme işlemini kabul ederse
        this.deleteProduct(product);
      },
      reject: () => {
        // İptal işlemi yapıldığında toast mesajı
        this.messageService.add({severity: 'info', summary: 'Cancelled', detail: 'Product deletion cancelled'});
      }
    });
  }

  // Ürünü siler ve Toast mesajı gösterir
  deleteProduct(product: ProductModel) {
    console.log(product)

    this.confirmationService.confirm({
      message: 'Silmek istiyor öusunuz?',
      header: 'Confirmation',
      icon:'',
      accept:() => {
         if(product.id){
    this._productService.deleteProduct(product.id);  // Ürünü sil
    this.productList = this.productList.filter(product => product.id !== product.id);  // Listeyi güncelle
 
    // Ürün silindikten sonra toast mesajını göster
    this.messageService.add({severity: 'success', summary: 'Success', detail: `${product.title} deleted successfully.`});
    this.fetch()}
      }
    })
   

  }

  deneme(product: ProductModel) {
    console.log(product)
  }

  showImageDialog(productModel: ProductModel) {
    this.selectedProductModel = productModel;
    this.displayImageDialog = true;
  }
}