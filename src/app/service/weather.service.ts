import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environments/env';
import { IWeatherResponse, Weather, WeatherForecast } from '../module/IWeather';

@Injectable({providedIn: 'root'})

export class WeatherService {
    private http = inject(HttpClient)
    constructor() {}
  
    getForecast(city:string): Observable<IWeatherResponse<WeatherForecast<Weather>>> {
      const url = `${env.API_URL}?q=${city}&units=metric&appid=${env.API_KEY}`;
     
      return this.http.get<IWeatherResponse<WeatherForecast<Weather>>>(url);
    }
}