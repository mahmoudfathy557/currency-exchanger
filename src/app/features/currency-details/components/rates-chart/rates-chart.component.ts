import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  type OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CurrencyExchangerService } from '@app/shared/services/currency-exchanger.service';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-rates-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './rates-chart.component.html',
  styleUrl: './rates-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesChartComponent implements OnInit {
  private currencyExchangerService = inject(CurrencyExchangerService);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  currencyExchangerForm = this.currencyExchangerService.currencyExchangerForm;
  isShowChart = false;

  data = computed(() => {
    return {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: `${this.base?.value} - ${this.target?.value}`,
          data: this.monthlyRatesOfPastYear(),
          // data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 25, 40],
          fill: false,
          borderColor: '',
          tension: 0.4,
        },
      ],
    };
  });

  get base() {
    return this.currencyExchangerForm?.get('base');
  }

  get target() {
    return this.currencyExchangerForm?.get('target');
  }

  options: any;

  monthlyRatesOfPastYear = computed(() =>
    this.currencyExchangerService.currencyHistoricalRates()
  );

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const { base, target } = params;
      if (base?.toLowerCase() !== 'eur') {
        this.isShowChart = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail:
            'Historical Chart data is only available with "EUR" due to current subscription',
          life: 10000,
        });
      } else {
        if (base && target) {
          this.isShowChart = true;
          this.getMonthlyRatesOfPastYear();
          this.setChartData();
        }
      }
    });
  }

  getMonthlyRatesOfPastYear() {
    this.getLastDayOfEachMonthPastYear().map((day, idx) => {
      this.currencyExchangerService
        .getHistoricalData(day, this.target?.value)
        .subscribe((res) => {
          if (this.monthlyRatesOfPastYear().length === 12) {
          }
        });
    });
  }

  getLastDayOfEachMonthPastYear() {
    this.currencyExchangerService.currencyHistoricalRates.set([]);
    const currentDate = new Date(); // Get the current date
    const lastYearDate = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    ); // Get the date for the same month and day but last year
    const lastDayOfEachMonth = [] as string[];
    for (let month = 0; month < 12; month++) {
      const lastDayOfMonth = new Date(
        lastYearDate.getFullYear(),
        lastYearDate.getMonth() + 1,
        0
      ); // Get the last day of the month for each month in the past year
      lastDayOfEachMonth.push(lastDayOfMonth.toISOString().split('T')[0]); // Store the last day of the month in ISO format (YYYY-MM-DD)
      lastYearDate.setMonth(lastYearDate.getMonth() + 1); // Move to the next month
    }
    return lastDayOfEachMonth;
  }

  setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = 'black';
    const textColorSecondary = 'black';
    const surfaceBorder = 'grey';

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
