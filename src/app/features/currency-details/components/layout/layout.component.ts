import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyExchangerComponent } from '../../../../shared/components/currency-exchanger/currency-exchanger.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [CommonModule, CurrencyExchangerComponent],
})
export class LayoutComponent {}
