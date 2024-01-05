import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-other-currencies',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './other-currencies.component.html',
  styleUrl: './other-currencies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherCurrenciesComponent implements OnInit {

  ngOnInit(): void { }

}
