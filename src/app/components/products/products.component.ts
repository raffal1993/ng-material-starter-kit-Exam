import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, map, Observable, Subject, switchMap} from 'rxjs';
import {ProductsModel} from '../../models/products.model';
import {ProductsService} from '../../services/products.service';

interface ProductDetails {
  id: number,
  category: string
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  readonly products$: Observable<ProductsModel[]> = this._productsService.getAll();


  private _productDetailsSubject: Subject<ProductDetails> = new Subject<ProductDetails>();
  public productDetails$: Observable<ProductDetails> = this._productDetailsSubject.asObservable();


  /*public selectedProduct$: Observable<ProductsModel[]> = this.productDetails$.pipe(switchMap(el => this.products$
    .pipe(map(products => products.filter(product => product.id === el.id)))))*/

  public selectedProduct$: Observable<ProductsModel | undefined> = combineLatest([
    this.products$,
    this.productDetails$
  ]).pipe(map(([products, details]) => products.find(prod => prod.id === details.id)))


  onClick(id: number, category: string): void {
    this._productDetailsSubject.next({id, category})
  }

  constructor(private _productsService: ProductsService) {
  }
}
