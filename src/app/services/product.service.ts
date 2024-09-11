import { Injectable } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList: ProductModel[] = [];
  categoryList: string[] = [];
  data = new BehaviorSubject<ProductModel[] | null>(null);

  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>('https://fakestoreapi.com/products');
  }

  getCategories(): Observable<string[]> {
    this.loadingSubject.next(true);
    return this._http
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(
        finalize(() => this.loadingSubject.next(false)) // İstek tamamlandığında loading durumunu false olarak ayarla
      );
  }

  getCategoryProducts(selectedCategory: string): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>(
      `https://fakestoreapi.com/products/category/` + selectedCategory
    );
  }

  selectedProductList(data: ProductModel[]) {
    this.data.next(data);
  }

  getProductByProductTitle(productName: string) {
    console.log(productName);
    return this.getProducts().pipe(
      map((productList) =>
        productList.find((product) => product.title === productName)
      )
    );
  }

  deleteProducts(id: string): Observable<ProductModel[]> {
    return this._http.delete<ProductModel[]>(
      'https://fakestoreapi.com/products/' + id
    );
  }

  updateProducts(id: string, data: any): Observable<ProductModel[]> {
    return this._http.post<ProductModel[]>(
      'https://fakestoreapi.com/products/' + id, data
    );
  }
}
