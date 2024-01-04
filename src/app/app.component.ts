import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { CurrencyExchangerComponent } from './shared/components/currency-exchanger/currency-exchanger.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    CurrencyExchangerComponent,
  ],
})
export class AppComponent {
  title = 'angular-currency-converter2';
}
