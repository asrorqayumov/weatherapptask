import { Component, OnInit, inject } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { WeatherChartComponent } from '../../components/chart/chart.component';
import { JsonPipe } from '@angular/common';
import { Weather, WeatherForecast } from '../../module/IWeather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl:"./home.component.css",
  standalone: true,
  imports: [WeatherChartComponent, JsonPipe],
})
export class HomeComponent implements OnInit {
  weatherService = inject(WeatherService);
  weatherData: WeatherForecast<Weather>[] = [];

  cities = [
    { name: 'New York', value: 'New York' },
    { name: 'London', value: 'London' },
    { name: 'Tokyo', value: 'Tokyo' },
    { name: 'Paris', value: 'Paris' },
    { name: 'Moscow', value: 'Moscow' },
    { name: 'Sydney', value: 'Sydney' },
  ];
  constructor() {}

  ngOnInit() {
    this.fetchWeatherData(this.cities[0].value);
  }
  onCityChange(event: any) {
    const selectedCity = event.target.value;
    this.fetchWeatherData(selectedCity);
  }

  fetchWeatherData(city: string) {
    this.weatherService.getForecast(city).subscribe((res) => {
      this.weatherData = res.list;
    });
  }
}
