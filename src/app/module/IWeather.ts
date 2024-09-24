export interface IWeatherResponse<T> {
  city: Object;
  cnt: number;
  cod: string;
  list: Array<T>;
  message: number;
}

export interface WeatherForecast<T> {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  sys: { pod: string };
  weather: Array<T>;
  wind: { speed: number; deg: number; gust: number };
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
