import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {combineLatest, map, Observable, of, startWith} from 'rxjs';
import {CatModel} from '../../models/cat.model';
import {CityModel} from '../../models/city.model';
import {CatsService} from '../../services/cats.service';
import {CitiesService} from '../../services/cities.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatsComponent {
  readonly cats$: Observable<CatModel[]> = this._catsService.getAll();
  readonly cities$: Observable<CityModel[]> = this._citiesService.getAll();
  readonly catPrices$: Observable<number[]> = of([0, 100, 200, 300, 400])


  readonly searchCats: FormGroup = new FormGroup({
    cityName: new FormControl(),
    price: new FormControl(),
    searchTerm: new FormControl()
  });


  constructor(private _catsService: CatsService, private _citiesService: CitiesService) {
  }


  readonly filteredCats$: Observable<CatModel[]> = combineLatest([
    this.cats$,
    this.searchCats.valueChanges.pipe(startWith({searchTerm: ""}))
  ]).pipe(
    map(([cats, {searchTerm, price, cityName}]) => {
      return cats.filter(cat => {
          if (cat.breed.match(new RegExp(searchTerm, "i"))) return true;
          if (cat.cityName.match(new RegExp(cityName, "i"))) return true;
          return !!`${cat.price}`.match(new RegExp(price, "i"));


        }
      )
    })
  )

}
