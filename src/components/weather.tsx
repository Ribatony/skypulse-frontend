import { component$, useStore, $ } from '@builder.io/qwik';
import '../styles/themes.css';
import { WeatherState, WeatherData, HourlyForecast } from '../types/weather';

export default component$(() => {
  const state = useStore<WeatherState>({
    city: '',
    weather: null,
    error: '',
    loading: false,
  });

  const fetchWeather = $(async () => {
    if (!state.city.trim()) {
      state.error = 'Please enter a city name';
      return;
    }

    state.loading = true;
    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(state.city.trim())}`
      );
      const data = await response.json();

      if (!response.ok) {
        state.error = data.error || 'Failed to fetch weather';
        state.weather = null;
      } else {
        state.weather = data;
        state.error = '';
      }
    } catch (err: any) {
      state.error = err.message || 'Network error';
      state.weather = null;
    } finally {
      state.loading = false;
    }
  });

  const handleKeyPress = $((e: KeyboardEvent) => {
    if (e.key === 'Enter') fetchWeather();
  });

  const getAQILabel = (index: number) => {
    const labels = ['Good', 'Moderate', 'Unhealthy for Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
    return labels[index - 1] || 'Unknown';
  };

  const getAQIColor = (index: number) => {
    const colors: Record<number, string> = {
      1: 'aqi-good',
      2: 'aqi-moderate',
      3: 'aqi-groups',
      4: 'aqi-unhealthy',
      5: 'aqi-very-unhealthy',
      6: 'aqi-hazardous',
    };
    return colors[index] || 'aqi-unknown';
  };

  return (
    <div class="app-container">
      <header class="header">
        <h1>skyPulse</h1>
        <p class="tagline">Real-time weather insights</p>
      </header>

      <div class="search-section">
        <div class="search-box">
          <input
            type="text"
            placeholder="Search city..."
            value={state.city}
            onInput$={(e) => (state.city = (e.target as HTMLInputElement).value)}
            onKeyPress$={handleKeyPress}
          />
          <button onClick$={fetchWeather} disabled={state.loading || !state.city.trim()}>
            {state.loading ? '⏳' : '🔍'}
          </button>
        </div>
      </div>

      {state.error && <div class="error-box">{state.error}</div>}

      {state.weather && (
        <div class={`weather-content ${getTheme(state.weather.condition)}`}>
          {/* Main Weather Card */}
          <div class="weather-main-card">
            <div class="location">
              <h2>📍 {state.weather.city}</h2>
              <p>{state.weather.region}, {state.weather.country}</p>
            </div>

            <div class="temp-display">
              <img src={state.weather.icon} alt={state.weather.condition} class="weather-icon-large" />
              <div class="temp-box">
                <span class="temperature">{state.weather.temp}°</span>
                <p class="condition">{state.weather.condition}</p>
              </div>
            </div>

            <div class="feels-like">
              Feels like <strong>{state.weather.feelslike}°</strong>
            </div>
          </div>

          {/* Details Grid */}
          <div class="details-grid">
            <div class="detail-card">
              <p class="label">💧 Humidity</p>
              <p class="value">{state.weather.humidity}%</p>
            </div>
            <div class="detail-card">
              <p class="label">💨 Wind</p>
              <p class="value">{Math.round(state.weather.wind_kph)} km/h</p>
              <p class="sub-value">{state.weather.wind_dir}</p>
            </div>
            <div class="detail-card">
              <p class="label">👁️ Visibility</p>
              <p class="value">{state.weather.vis_km} km</p>
            </div>
            <div class="detail-card">
              <p class="label">☀️ UV Index</p>
              <p class="value">{state.weather.uv_index}</p>
            </div>
            <div class="detail-card">
              <p class="label">🔽 Pressure</p>
              <p class="value">{state.weather.pressure_mb} mb</p>
            </div>
            <div class={`detail-card aqi-card ${getAQIColor(state.weather.aqi.us_epa_index)}`}>
              <p class="label">💨 Air Quality</p>
              <p class="value">{getAQILabel(state.weather.aqi.us_epa_index)}</p>
              <p class="sub-value">PM2.5: {state.weather.aqi.pm2_5}</p>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div class="hourly-section">
            <h3>Hourly Forecast</h3>
            <div class="hourly-scroll">
              {state.weather?.hourly.map((hour: HourlyForecast) => (
                <div key={hour.time} class="hourly-card">
                  <p class="time">{hour.time}</p>
                  <img src={hour.icon} alt={hour.condition} class="hourly-icon" />
                  <p class="hourly-temp">{Math.round(hour.temp)}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

function getTheme(condition: string) {
  if (condition.includes('Sunny') || condition.includes('Clear')) return 'sunny-theme';
  if (condition.includes('Cloudy') || condition.includes('Overcast')) return 'cloudy-theme';
  if (condition.includes('Rain')) return 'rainy-theme';
  if (condition.includes('Storm')) return 'stormy-theme';
  if (condition.includes('Snow')) return 'snow-theme';
  return 'default-theme';
}

