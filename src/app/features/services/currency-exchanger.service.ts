import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ICurrency } from '../models/cuurency-type';
import { CrudService } from '../../core/services/crud.service';
import { Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangerService {
  getUrlByType(type: string) {
    return `${environment.APIUrl}${type}?access_key=${environment.currencyApiAccessKey}`;
  }
  private _http = inject(HttpClient);

  private fb = inject(FormBuilder);

  currencyExchangerResponse = signal([] as ICurrency[]);

  getLatest(params: Params): Observable<ICurrency> {
    return this._http
      .get<ICurrency>(`${this.getUrlByType('latest')}`, { params })
      .pipe(
        tap((res) => {
          console.log('res', res);
          // this.currencyExchangerResponse.set(res);
        })
      );
  }
}
