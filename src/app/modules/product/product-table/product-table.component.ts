import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { filter } from 'rxjs';
import { ProductEditComponent } from '../product-edit/product-edit.component';

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


  show(product: ProductModel) {
    console.log(product);
    this.dialogService
      .open(ProductEditComponent, {
        header: 'Edit Product',
        width: '70%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        baseZIndex: 10000,
        data: product,
      })
      .onClose.subscribe((updatedProduct: ProductModel) => {
        if (updatedProduct) {
          // Güncellenmiş ürün bilgisini alıp tablodaki ilgili ürünü güncelliyoruz
          let index = this.productList.findIndex(
            (pr) => pr.id === updatedProduct.id
          );
          if (index !== -1) {
            this.productList[index] = updatedProduct;
          }
        }
      });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this._activatedRoute.paramMap.subscribe((params) => {
      this.categoryName = params.get('categoryName') ?? '';
      this.getProductByCategory();
    });

    // URL'deki değişimleri tespit ediyorum (categoryName parametresini almak için)
    this._route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('EVENT: ', event);
        if (event instanceof NavigationEnd) {
          this.categoryName =
            this._activatedRoute.snapshot.paramMap.get('categoryName') || '';
          this.getProductByCategory();
        }
      });
  }

  getProductByCategory() {
    if (this.categoryName) {
      this._productService.getProducts().subscribe((response) => {
        this.productList = response.filter(
          (element) => element.category === this.categoryName
        );
      });
    } else {
      this._productService.getProducts().subscribe((response) => {
        this.productList = response;
      });
    }
  }

  deleteProduct(id: string) {
    this._productService.deleteProducts(id).subscribe(() => {
      console.log('Ürün silindi');
      const index = this.productList.findIndex((product) => product.id);
      if (index !== -1) {
        this.productList.splice(index, 1);
      }
    });
  }

}
