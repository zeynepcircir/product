import { Injectable } from '@angular/core';
import { Category, ProductModel } from '../models/ProductModel';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CategoryRoute } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localStorageKey = 'productList';
  private productList: ProductModel[] = []; 
  private categoryList: CategoryRoute[] = [
    new CategoryRoute(Category.AllProducts, 'all-products'),
    new CategoryRoute(Category.MobilePhones, 'mobile-phones'),
    new CategoryRoute(Category.Laptops, 'laptops'),
    new CategoryRoute(Category.Cameras, 'cameras'),
    new CategoryRoute(Category.AudioHeadphones, 'audio-headphones')
  ];

  private productListSubject = new BehaviorSubject<ProductModel[]>(this.productList);
  private categoryListSubject = new BehaviorSubject<CategoryRoute[]>(this.categoryList);

  constructor() {
    this.loadProductsFromLocalStorage(); 
  }


  getProducts(): Observable<ProductModel[]> {
    return this.productListSubject.asObservable();
  }


  getCategories(): Observable<CategoryRoute[]> {
    return this.categoryListSubject.asObservable();
  }


  getCategoryProducts(category: string): Observable<ProductModel[]> {
    let selectedCategory = ""
    this.categoryList.forEach(a => {
      if (a.route == category) {
        selectedCategory = a.category.toString()
      }
    })
    if (selectedCategory === Category.AllProducts.toString()) {
      return of(this.productList);
    }
    const filteredProducts = this.productList.filter(product => product.category === selectedCategory);
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


  updateProduct(id: number, updatedData: ProductModel): void {
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
