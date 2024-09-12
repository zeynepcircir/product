import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { filter } from 'rxjs';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductAddComponent } from '../product-add/product-add.component'; // Add import

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  viewMode: 'cards' | 'table' = 'cards';
  productList: ProductModel[] = [];
  categoryName: string = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    private _productService: ProductService,
    private _route: Router,
    private dialogService: DialogService,
    private _activatedRoute: ActivatedRoute
  ) {}

  // Show Product Edit Dialog
  show(product: ProductModel) {
    this.dialogService
      .open(ProductEditComponent, {
        header: 'Edit Product',
        width: '40%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
        data: product,
      })
      .onClose.subscribe((updatedProduct: ProductModel) => {
        if (updatedProduct) {
          const index = this.productList.findIndex((pr) => pr.id === updatedProduct.id);
          if (index !== -1) {
            this._productService.updateProduct(updatedProduct.id!, updatedProduct); // Güncellenmiş ürünü servise gönderiyoruz
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
        width: '40%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
      })
      .onClose.subscribe((newProduct: ProductModel) => {
        if (newProduct) {
          this._productService.addProduct(newProduct); // Yeni ürünü servise ekliyoruz
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
      this.categoryName = params.get('categoryName') ?? '';
      this.getProductByCategory();
    });

    this._route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.categoryName = this._activatedRoute.snapshot.paramMap.get('categoryName') || '';
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
    this._productService.updateProduct(product.id!, product); // Serviste ürünü güncelliyoruz
  }
  
  deleteProduct(id: number) {
    this._productService.deleteProduct(id); // Mock veri listesinden ürünü siliyoruz
    this.productList = this.productList.filter(product => product.id !== id); // Arayüzdeki listeyi de güncelliyoruz
  }

  deneme(product: ProductModel) {
    console.log(product)
  }
}
