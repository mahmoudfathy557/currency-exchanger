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
import { ICurrency } from '../../../features/home/models/cuurency-type';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { PageName } from '@app/shared/enums/pages-names';

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
    RouterLink,

    RouterLinkActive,
  ],
  templateUrl: './currency-exchanger.component.html',
  styleUrl: './currency-exchanger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyExchangerComponent implements OnInit {
  private currencyExchangerService = inject(CurrencyExchangerService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);

  isHomePage = this.router.url.includes(PageName.Home);

  currencyExchangerForm = this.currencyExchangerService.currencyExchangerForm;

  ngOnInit(): void {
    this.currencyExchangerService.getSymbols().subscribe();

    this.disableOrEnableBaseAndTarget();
    console.log('currencyExchangerForm', this.currencyExchangerForm.value);
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
    }
  }

  onConvert() {
    if (this.base?.value && this.target?.value) {
      this.currencyExchangerService
        .getLatest(this.base.value)
        .subscribe((res) => {
          // Setting values of 'formula' and 'result'
          if (res.result === 'success') {
            const result =
              Number(this.amount?.value) *
              Number(res.conversion_rates[this.target?.value as string]);

            this.formula?.setValue(`
        1.00 ${this.base?.value} = ${res.conversion_rates[
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
  onBaseChange(event: DropdownChangeEvent) {}

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
