import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Weather, WeatherForecast } from '../../module/IWeather';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-weather-chart',
  templateUrl: './chart.component.html',
  styles: [
    `
      #canvas {
        width: 100% !important;
        height: 100% !important;
      }
    `,
  ],
  standalone: true,
  providers: [DatePipe],
})
export class WeatherChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() weatherData!: WeatherForecast<Weather>[];
  chart: Chart | null = null;
  datePipe: DatePipe = inject(DatePipe);

  ngOnInit(): void {
    if (this.weatherData.length > 0) {
      this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && this.weatherData.length > 0) {
      this.createChart();
    }
  }

  createChart(): void {
    const labels = this.weatherData.map((data) => {
      const date = new Date(data.dt_txt);
      const hours = this.datePipe.transform(date, 'HH:mm');
      const day = this.datePipe.transform(date, 'dd');
      const month = this.datePipe.transform(date, 'MMMM')?.toLowerCase();

      if (hours === '00:00') {
        return `${day}-${month}`;
      }
      return hours!;
    });
    const temperatures = this.weatherData.map((data) => data.main.temp);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('canvas', {
      type: 'line', // Change to 'bar' for a bar chart
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: 'rgb(246, 186, 76)',
            backgroundColor: 'orange',
            borderWidth: 2
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'left',
            textDirection: 'ltr',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
