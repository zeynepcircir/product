import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/ProductModel';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {

  constructor() { }
  productList: ProductModel[] = [];
  ngOnInit(): void {
  }

}
