import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { CurrencyExchangerComponent } from './features/components/currency-exchanger/currency-exchanger.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
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
    ToastModule,
  ],
  providers: [MessageService],
})
export class AppComponent {
  title = 'angular-currency-converter2';
}
