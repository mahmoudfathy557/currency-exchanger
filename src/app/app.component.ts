import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    ToastModule,
    NgxSpinnerModule,
  ],
})
export class AppComponent {
  title = 'angular-currency-converter2';
}
