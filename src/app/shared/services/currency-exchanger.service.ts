import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangerService {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  currencyExchangerForm = this.fb.group({
    amount: new FormControl('All'),
    from: new FormControl('All'),
    to: new FormControl('All'),
    result: new FormControl(''),
    approxResult: new FormControl(''),
  });
}
