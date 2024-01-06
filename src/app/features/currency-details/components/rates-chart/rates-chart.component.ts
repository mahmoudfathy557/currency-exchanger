import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-rates-chart',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './rates-chart.component.html',
  styleUrl: './rates-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesChartComponent implements OnInit {

  ngOnInit(): void { }

}
