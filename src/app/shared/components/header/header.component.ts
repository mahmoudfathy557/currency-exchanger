import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyExchangerService } from '@app/shared/services/currency-exchanger.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private currencyExchangerService = inject(CurrencyExchangerService);
  private router = inject(Router);

  currencyExchangerForm = this.currencyExchangerService.currencyExchangerForm;

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

  onEurUsd(e: Event) {
    e.preventDefault();
    this.onRedirect('EUR', 'USD');
  }
  onEurGbp(e: Event) {
    e.preventDefault();
    this.onRedirect('EUR', 'GBP');
  }

  onRedirect(base: string, target: string) {
    this.amount?.setValue('1');
    this.base?.setValue(base);
    this.target?.setValue(target);
    this.router.navigate([`currency-details/${base}/${target}`]);
  }
}
