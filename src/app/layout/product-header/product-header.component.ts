import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryRoute } from 'src/app/models/Category';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss']
})
export class ProductHeaderComponent implements OnInit {

  categoryList: CategoryRoute[] = [];
  isMenuOpen =   false
  @Output() productsBySelectedCategory = new EventEmitter<ProductModel[]>();


  constructor(
    private productService: ProductService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  handleClick(event: string | null) {
    this._route.navigate(['/home/product/' + event]);
    this.isMenuOpen = false; // Menüye tıklayınca menüyü kapat
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Menüyü açıp kapatma
  }

  getCategories() {
    this.productService.getCategories().subscribe((response) => {
      this.categoryList = response;
      // Tüm ürünleri çekmek için
      this.productService.getProducts().subscribe((products) => {
        this.productsBySelectedCategory.emit(products);
      });
    });
  }

}
