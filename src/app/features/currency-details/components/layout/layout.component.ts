import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { CurrencyExchangerComponent } from '../../../../shared/components/currency-exchanger/currency-exchanger.component';
import { RatesChartComponent } from '../rates-chart/rates-chart.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  currencySymbolsWithName = computed(() =>
    this.currencyExchangerService.currencySymbolsWithName()
  );

  currencyExchangerForm = this.currencyExchangerService.currencyExchangerForm;

  get base() {
    return this.currencyExchangerForm?.get('base')?.value as string;
  }

  title!: string;

  ngOnInit(): void {
    console.log(this.currencySymbolsWithName());
    this.title = `${this.base} - ${this.currencySymbolsWithName()[this.base]}`;
  }
}
