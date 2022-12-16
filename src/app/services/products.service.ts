import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductsModel} from "../models/products.model";

@Injectable()
export class ProductsService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<ProductsModel[]> {
    return this._httpClient.get<ProductsModel[]>(`https://fakestoreapi.com/products`);
  }

  getProductsByCategories(category: string): Observable<string[]> {
    return this._httpClient.get<string[]>(`https://fakestoreapi.com/products/category/${category}`)
  }


}
