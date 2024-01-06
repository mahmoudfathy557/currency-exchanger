import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
} from '@angular/core';
import { CurrencyExchangerComponent } from '../../../../shared/components/currency-exchanger/currency-exchanger.component';
import { RatesChartComponent } from '../rates-chart/rates-chart.component';
import {
  ActivatedRoute,
  Params,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CurrencyExchangerService } from '@app/shared/services/currency-exchanger.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    CommonModule,
    CurrencyExchangerComponent,
    RatesChartComponent,
    RouterLink,

    RouterLinkActive,
  ],
})
export class LayoutComponent implements OnInit {
  private currencyExchangerService = inject(CurrencyExchangerService);
  private activatedRoute = inject(ActivatedRoute);

  currencySymbolsWithName = computed(() =>
    this.currencyExchangerService.currencySymbolsWithName()
  );

  currencyExchangerForm = this.currencyExchangerService.currencyExchangerForm;

  get base() {
    return this.currencyExchangerForm?.get('base');
  }

  get target() {
    return this.currencyExchangerForm?.get('target');
  }

  title = computed(() => {
    return `${this.base?.value} - ${
      this.currencySymbolsWithName()[this.base?.value as string]
    }`;
  });

  constructor() {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const { base, target } = params;
      if (base && target) {
        this.base?.setValue(base);
        this.target?.setValue(target);
      }
    });
  }
}
