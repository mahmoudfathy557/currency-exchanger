import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { CurrencyExchangerComponent } from './features/components/currency-exchanger/currency-exchanger.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { OtherCurrenciesComponent } from './features/components/other-currencies/other-currencies.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    CurrencyExchangerComponent,
    ToastModule,
    OtherCurrenciesComponent,
  ],
})
export class AppComponent {
  title = 'angular-currency-converter2';
}
