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

  currencyExchangerForm = this.currencyExchangerService.currencyExchangerForm;

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

  get amount() {
    return this.currencyExchangerForm?.get('amount');
  }

  get base() {
    return this.currencyExchangerForm?.get('base');
  }

  get target() {
    return this.currencyExchangerForm?.get('target');
  }

  get formula() {
    return this.currencyExchangerForm?.get('formula');
  }

  get result() {
    return this.currencyExchangerForm?.get('result');
  }

  onSwap() {
    if (this.base?.value && this.target?.value) {
      const tempBase = this.base?.value as string;
      const tempTarget = this.target?.value as string;
      this.base?.setValue(this.target?.value as string);
      this.target?.setValue(tempBase);
      console.log(this.currencyExchangerForm.value);

      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Current api has only "EUR" as a base currency',
      });
      setTimeout(() => {
        this.base?.setValue('EUR');
        this.target?.setValue(tempTarget);
      }, 2000);
    }
  }

  onConvert() {
    if (this.base?.value && this.target?.value) {
      const params = {
        // base,
        symbols: `${this.target.value},AED,AFN,AMD,ANG,AOA,ARS,AUD,AWG,AZN`,
      };
      this.currencyExchangerService.getLatest(params).subscribe((res) => {
        // Setting values of 'formula' and 'result'
        if (res.success) {
          const result =
            Number(this.amount?.value) *
            Number(res.rates[this.target?.value as string]);

          this.formula?.setValue(`
        1.00 ${this.base?.value} = ${res.rates[
            this.target?.value as string
          ].toFixed(2)} ${this.target?.value}
        `);

          this.result?.setValue(`
        ${result.toFixed(2)} ${this.target?.value}
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
