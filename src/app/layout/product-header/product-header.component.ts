import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss']
})
export class ProductHeaderComponent implements OnInit {

  categoryList: string[] = [];

  @Output() productsBySelectedCategory = new EventEmitter<ProductModel[]>();


  constructor(
    private _http: HttpClient,
    private productService: ProductService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  handleClick(event: string | null) {
      console.log('EVENTE TIKLANDI', event);
        this._route.navigate(['/product-card/' + event]);
    
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
