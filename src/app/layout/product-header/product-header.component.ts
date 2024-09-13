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
  @Output() productsBySelectedCategory = new EventEmitter<ProductModel[]>();
  isMobileMenuOpen: boolean = false;

  constructor(
    private productService: ProductService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  handleClick(route: string | null) {
    if (route) {
      this._route.navigate(['/home/product/' + route]);
    }
    this.isMobileMenuOpen = false; 
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;  
  }

  getCategories() {
    this.productService.getCategories().subscribe((response) => {
      this.categoryList = response;
      this.productService.getProducts().subscribe((products) => {
        this.productsBySelectedCategory.emit(products);
      });
    });
  }
}
