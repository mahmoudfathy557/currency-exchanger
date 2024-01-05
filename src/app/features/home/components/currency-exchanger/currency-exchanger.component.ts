import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  type OnInit,
  computed,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyExchangerService } from '../../services/currency-exchanger.service';
import { ICurrency } from '../../models/cuurency-type';
import { Params } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';

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
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

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

  ngOnInit(): void {
    this.currencyExchangerService.getSymbols().subscribe();

    this.disableOrEnableBaseAndTarget();
  }

  currenciesOptions = computed(() =>
    this.currencyExchangerService.currencySymbols()
  );

  currencyExchangerResponse = computed(() =>
    this.currencyExchangerService.currencyExchangerResponse()
  );

  onConvert() {
    console.log(this.currencyExchangerForm.value);
    const { base, target, amount } = this.currencyExchangerForm.value;
    if (base && target) {
      this.currencyExchangerService.getLatest({}).subscribe((res) => {
        if (res.success) {
          const result = Number(amount) * Number(res.rates[target]);

          this.currencyExchangerForm.get('formula')?.setValue(`
        1.00 ${base} = ${res.rates[target]} ${target}
        `);

          this.currencyExchangerForm.get('result')?.setValue(`
        ${result} ${target}
        `);
        }
      });
    }
  }

  onTargetChange(event: DropdownChangeEvent) {}
  onBaseChange(event: DropdownChangeEvent) {
    if (event.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Current api has only "EUR" as a base currency',
      });
      setTimeout(() => {
        this.currencyExchangerForm.get('base')?.setValue('EUR');
      }, 2000);
    }
  }

  disableOrEnableBaseAndTarget() {
    // Enable or Disable base & target after setting amount
    this.currencyExchangerForm.controls['amount'].valueChanges.subscribe(
      (res) => {
        if (res) {
          this.currencyExchangerForm.controls['base'].enable();
          this.currencyExchangerForm.controls['target'].enable();
        } else {
          this.currencyExchangerForm.controls['base'].disable();
          this.currencyExchangerForm.controls['target'].disable();
        }
      }
    );
  }
}
