import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ICurrency, ISymbol } from '../../features/home/models/cuurency-type';
import { Params } from '@angular/router';
import { CrudService } from '@app/core/services/crud.service';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangerService extends CrudService<ICurrency, string> {
  constructor() {
    super();
  }

  getUrlByType(type: string) {
    return `${environment.APIUrl}${type}?access_key=${environment.currencyApiAccessKey}`;
  }

  getResourceUrl(): string {
    return 'VacationRequests';
  }

  private fb = inject(FormBuilder);

  currencyExchangerForm = this.fb.group({
    amount: new FormControl('', [Validators.required]),
    base: new FormControl(
      {
        value: 'EUR',
        disabled: true,
      },
      [Validators.required]
    ),
    target: new FormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
    result: new FormControl({
      value: 'XX.XX USD',
      disabled: true,
    }),
    formula: new FormControl({
      value: '1.00 EUR = XX.XX USD',
      disabled: true,
    }),
  });

  currencyExchangerResponse = signal({} as ICurrency);
  currencySymbols = signal([] as string[]);
  currencyRates = signal([] as [string, number][]);

  // Note : EUR is the only free available base in this api => i'll stick to it
  getLatest(params?: Params): Observable<ICurrency> {
    return this._http
      .get<ICurrency>(`${this.getUrlByType('latest')}`, { params })
      .pipe(
        tap((res) => {
          console.log('res', res);

          this.currencyExchangerResponse.set(res);
          this.currencyRates.set(Object.entries(res.rates));
        })
      );
  }

  getSymbols(params?: Params): Observable<ISymbol> {
    return this._http
      .get<ISymbol>(`${this.getUrlByType('symbols')}`, { params })
      .pipe(
        tap((res) => {
          console.log('res', res);
          const currencyList = Object.keys(res.symbols);
          this.currencySymbols.set(currencyList);
        })
      );
  }
}
