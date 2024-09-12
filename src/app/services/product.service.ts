import { Injectable } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localStorageKey = 'productList';
  private productList: ProductModel[] = []; 
  private categoryList: string[] = ['ALL PRODUCTS','Mobile Phones', 'Laptops', 'Cameras', 'Audio & Headphones']; 

  private productListSubject = new BehaviorSubject<ProductModel[]>(this.productList);
  private categoryListSubject = new BehaviorSubject<string[]>(this.categoryList);

  constructor() {
    this.loadProductsFromLocalStorage(); 
  }


  getProducts(): Observable<ProductModel[]> {
    return this.productListSubject.asObservable();
  }


  getCategories(): Observable<string[]> {
    return this.categoryListSubject.asObservable();
  }


  getCategoryProducts(category: string): Observable<ProductModel[]> {
    const filteredProducts = this.productList.filter(product => product.category === category);
    return of(filteredProducts);
  }


  addProduct(newProduct: ProductModel): void {

    const isProductExist = this.productList.some(product => product.title === newProduct.title && product.category === newProduct.category);

    if (!isProductExist) {
      newProduct.id = this.generateNewId();
      this.productList.push(newProduct);
      this.saveProductsToLocalStorage();
      this.productListSubject.next(this.productList);
    }
  }


  updateProduct(id: number, updatedData: Partial<ProductModel>): void {
    const index = this.productList.findIndex(product => product.id === id);
    if (index !== -1) {
      this.productList[index] = { ...this.productList[index], ...updatedData };
      this.saveProductsToLocalStorage();
      this.productListSubject.next(this.productList);
    }
  }


  deleteProduct(id: number): void {
    this.productList = this.productList.filter(product => product.id !== id);
    this.saveProductsToLocalStorage();
    this.productListSubject.next(this.productList);
  }


  private loadProductsFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      const storedProducts = JSON.parse(data) as ProductModel[];

    
      if (storedProducts.length > 0) {
        this.productList = storedProducts;
        this.productListSubject.next(this.productList);
      }
    }
  }


  private saveProductsToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.productList));
  }


  private generateNewId(): number {
    return this.productList.length > 0
      ? Math.max(...this.productList.map(product => product.id!)) + 1
      : 1;
  }
}
