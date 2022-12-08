import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductModel} from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(private _httpClient: HttpClient) {
  }

  getProducts(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>(`https://fakestoreapi.com/products`);
  }

  removeProduct(id: number): Observable<ProductModel> {
    return this._httpClient.delete<ProductModel>(`https://fakestoreapi.com/products/${id}`);
  }

}
