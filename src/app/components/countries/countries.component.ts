import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { CountryModel } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  readonly countries$: Observable<CountryModel[]> = this._countriesService
    .getAll()
    .pipe(shareReplay(1));

  readonly params$: Observable<Params> = this._activatedRoute.queryParams.pipe(
    map((params) => ({ pageSize: params['pageSize'] || 5, pageNumber: params['pageNumber'] || 1 })),
    shareReplay(1)
  );

  readonly filteredCountries$: Observable<CountryModel[]> = combineLatest([
    this.countries$,
    this.params$,
  ]).pipe(
    map(([countries, params]) =>
      countries.slice(
        (params['pageNumber'] - 1) * params['pageSize'],
        params['pageNumber'] * params['pageSize']
      )
    )
  );

  readonly pages$: Observable<number[]> = combineLatest([this.countries$, this.params$]).pipe(
    map(([countries, params]) => {
      const quantity = this.getQuantityOfCountries(countries, params['pageSize']);

      const currentPage = params['pageNumber'];

      const arrayOfPages = [...Array(quantity + 1).keys()].slice(1);

      const fancyPageButtons = [
        arrayOfPages[0],
        arrayOfPages[currentPage - 2],
        arrayOfPages[currentPage - 1],
        arrayOfPages[currentPage],
        arrayOfPages[arrayOfPages.length - 1],
      ].filter(Number);

      return [...new Set(fancyPageButtons)];
    }),
    shareReplay(1)
  );

  readonly pageSizeOptions$: Observable<number[]> = of([5, 10, 15]);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _countriesService: CountriesService
  ) {}

  onPageSizeChange(pageSize: number): void {
    combineLatest([this.countries$, this.params$])
      .pipe(take(1))
      .subscribe(([countries, params]) => {
        const newPages = this.getQuantityOfCountries(countries, pageSize);

        const newParams =
          newPages < params['pageNumber'] ? { pageSize, pageNumber: newPages } : { pageSize };

        this._router.navigate([], {
          queryParams: {
            ...newParams,
          },
          queryParamsHandling: 'merge',
        });
      });
  }

  onPageNumberChange(pageNumber: number): void {
    this._router.navigate([], {
      queryParams: {
        pageNumber: pageNumber,
      },
      queryParamsHandling: 'merge',
    });
  }

  private getQuantityOfCountries(countries: CountryModel[], pageSize: number): number {
    return countries.length % pageSize === 0
      ? countries.length / pageSize
      : Math.floor(countries.length / pageSize + 1);
  }
}
