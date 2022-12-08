import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, Observable, Subject, combineLatest, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductModel} from '../../models/product.model';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';

type PriceSorting = "Ascending" | "Descending"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  readonly categories$: Observable<string[]> = this._categoryService.getCategories();


  private _selectedCategorySubject: Subject<string> = new Subject<string>();
  public selectedCategory$: Observable<string> = this._selectedCategorySubject.asObservable();

  private _priceSortingSubject: BehaviorSubject<PriceSorting> = new BehaviorSubject<PriceSorting>("Ascending");
  public priceSorting$: Observable<PriceSorting> = this._priceSortingSubject.asObservable();

  private _refreshedProductsSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  public refreshedProducts$: Observable<ProductModel[]> = this._refreshedProductsSubject.asObservable().pipe(switchMap(() => this._productService.getProducts()))


  constructor(private _categoryService: CategoryService, private _productService: ProductService) {
  }


  readonly products$: Observable<ProductModel[]> = combineLatest([
    this.refreshedProducts$,
    this.selectedCategory$,
    this.priceSorting$
  ]).pipe(map(([products, selectedCategory, priceSorting]: [ProductModel[], string, PriceSorting]) => {
    const filteredProductsByCategory = products.filter(product => {
      return product.category === selectedCategory
    })

    return filteredProductsByCategory.sort((a, b) => {
      if (a.price > b.price) return priceSorting === "Ascending" ? 1 : -1;
      if (a.price < b.price) return priceSorting === "Ascending" ? 1 : -1;
      return 0
    })
  }))

  onSelectCategory(item: string) {
    this._selectedCategorySubject.next(item)
  }

  removeProduct(id: number) {
    this._productService.removeProduct(id).subscribe(() => this._refreshedProductsSubject.next())
  }

  sortByPrice(typeOfSorting: PriceSorting) {
    const sortBy = typeOfSorting === "Ascending" ? "Descending" : "Ascending"
    this._priceSortingSubject.next(sortBy)
  }
}
