import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CityModel} from '../models/city.model';

@Injectable()
export class CitiesService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<CityModel[]> {
    return this._httpClient.get<CityModel[]>(`https://636ce2d8ab4814f2b2712854.mockapi.io/cities`);
  }
}
