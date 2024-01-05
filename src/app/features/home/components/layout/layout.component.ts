import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyExchangerComponent } from '../currency-exchanger/currency-exchanger.component';
import { OtherCurrenciesComponent } from '../other-currencies/other-currencies.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyExchangerComponent, OtherCurrenciesComponent],
})
export class LayoutComponent {}
