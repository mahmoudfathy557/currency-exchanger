import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import {
  ICurrency,
  ICurrency1,
  ISymbol,
} from '../../features/home/models/cuurency-type';
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

  // Note: i used two different APIS due to their limitations for free subscription

  getUrlByType(type: string) {
    return `${environment.APIUrl}${type}?access_key=${environment.currencyApiAccessKey}`;
  }

  getUrlByType1(type: string) {
    return `${environment.APIUrl1}/${environment.currencyApiAccessKey1}/${type}`;
  }

  getResourceUrl(): string {
    return '';
  }

  private fb = inject(FormBuilder);

  currencyExchangerForm = this.fb.group({
    amount: new FormControl('', [Validators.required]),
    base: new FormControl(
      {
        value: '',
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

  currencyExchangerResponse = signal({} as ICurrency1);
  currencySymbols = signal([] as string[]);
  currencySymbolsWithName = signal({} as { [currencyCode: string]: string });
  currencyRates = signal([] as [string, number][]);

  currencyHistoricalRates = signal([] as number[]);

  getLatest(param?: string): Observable<ICurrency1> {
    return this._http
      .get<ICurrency1>(`${this.getUrlByType1('latest')}/${param}`)
      .pipe(
        tap((res) => {
          this.currencyExchangerResponse.set(res);
          this.currencyRates.set(Object.entries(res.conversion_rates));
        })
      );
  }

  getHistoricalData(date: string, symbols?: any): Observable<ICurrency> {
    const params = {
      symbols,
    };
    return this._http
      .get<ICurrency>(
        `${environment.APIUrl}/${date}?access_key=${environment.currencyApiAccessKey}`,
        { params }
      )
      .pipe(
        tap((res) => {
          res.success &&
            this.currencyHistoricalRates.set([
              ...this.currencyHistoricalRates(),
              Object.values(res.rates)[0],
            ]);
        })
      );
  }

  getSymbols(params?: Params): Observable<ISymbol> {
    return this._http
      .get<ISymbol>(`${this.getUrlByType('symbols')}`, { params })
      .pipe(
        tap((res) => {
          const currencyList = Object.keys(res.symbols);
          this.currencySymbols.set(currencyList);
          this.currencySymbolsWithName.set(res.symbols);
        })
      );
  }
}
