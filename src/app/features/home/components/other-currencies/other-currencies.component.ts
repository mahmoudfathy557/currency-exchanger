import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  type OnInit,
} from '@angular/core';
import { CurrencyExchangerService } from '../../../../shared/services/currency-exchanger.service';

@Component({
  selector: 'app-other-currencies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './other-currencies.component.html',
  styleUrl: './other-currencies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherCurrenciesComponent implements OnInit {
  private currencyExchangerService = inject(CurrencyExchangerService);

  ngOnInit(): void {}

  currencyExchangerForm = this.currencyExchangerService.currencyExchangerForm;

  get amount() {
    return Number(this.currencyExchangerForm?.get('amount')?.value);
  }

  currencyRates = computed(() => this.currencyExchangerService.currencyRates());

  firstCurrencyList = computed(() => this.currencyRates().slice(0, 3));
  secondCurrencyList = computed(() => this.currencyRates().slice(3, 6));
  thirdCurrencyList = computed(() => this.currencyRates().slice(6, 9));
}
