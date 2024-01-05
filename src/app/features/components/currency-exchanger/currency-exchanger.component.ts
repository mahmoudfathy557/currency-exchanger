import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  type OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CurrencyExchangerService } from '../../services/currency-exchanger.service';
import { ICurrency } from '../../models/cuurency-type';
import { Params } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-currency-exchanger',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
  ],
  templateUrl: './currency-exchanger.component.html',
  styleUrl: './currency-exchanger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyExchangerComponent implements OnInit {
  private currencyExchangerService = inject(CurrencyExchangerService);
  // private fb = inject(FormBuilder);
  private fb = inject(FormBuilder);

  ngOnInit(): void {}

  currencyExchangerForm = this.fb.group({
    amount: new FormControl('All'),
    from: new FormControl('All'),
    to: new FormControl('All'),
    result: new FormControl(''),
    approxResult: new FormControl(''),
  });
}
