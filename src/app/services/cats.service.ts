import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CatModel} from '../models/cat.model';

@Injectable()
export class CatsService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<CatModel[]> {
    return this._httpClient.get<CatModel[]>(`https://636ce2d8ab4814f2b2712854.mockapi.io/cats`);
  }
}
