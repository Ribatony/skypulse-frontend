export interface WeatherAQI {
  us_epa_index: number;
  pm2_5: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  condition: string;
}

export interface WeatherData {
  city: string;
  region: string;
  country: string;
  temp: number;
  feelslike: number;
  condition: string;
  icon: string;
  humidity: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  vis_km: number;
  uv_index: number;
  aqi: WeatherAQI;
  hourly: HourlyForecast[];
}

export interface WeatherState {
  city: string;
  weather: WeatherData | null;
  error: string;
  loading: boolean;
}
