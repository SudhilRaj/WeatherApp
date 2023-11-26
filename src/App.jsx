import { useState } from 'react';
import { getName as getCountry} from 'country-list';
import constants from './constants';
import bgImg from './assets/bg4.gif';
import placeholder from './assets/season.svg';

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');

  const getWeather = () => {
    fetch(`${constants.API_URL}?q=${city}&units=imperial&appid=${constants.WEATHER_MAP_API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
  }

  return (
    <div className='flex flex-col items-center justify-between p-12 h-screen bg-cover bg-center bg-no-repeat text-white overflow-y-auto' style={{ backgroundImage: `url(${bgImg})` }}>
      <div className='flex flex-col items-center w-full'>
        <h1 className='text-4xl font-semibold py-4 text-center'>Welcome to Weather App</h1>
        <input
          name='city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter a city to get current weather'
          onKeyUp={getWeather}
          autoComplete='off'
          className='w-3/4 lg:w-1/2 m-0 p-3 sm:p-4 text-black border-solid border-2 border-black-600 rounded sm:rounded-md text-md sm:text-xl focus:outline-none ring-offset-2 ring'
        />
      </div>

      {weatherData?.cod === "404" && (
        <p className='text-xl pt-4'>{weatherData?.message}</p>
      )}

      {weatherData?.main && (
        <>
        <div className='flex flex-col items-center mt-10'>
            <p className='text-3xl font-light'>{weatherData?.name || "-"} {weatherData?.sys?.country && <span>({getCountry(weatherData.sys.country)})</span>}</p>
            <p className='text-7xl font-semibold p-5 my-4 border-solid border-2 border-slate-400 rounded-xl'>{Math.round(weatherData?.main?.temp || 0)}&deg;F</p>
            <p className='flex items-center text-3xl font-light'>
              {weatherData?.weather?.[0]?.icon && <img className='w-20' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather"/>}
              <span>{weatherData?.weather?.[0]?.main || "-"} </span>
            </p>  
        </div>
      
        <div className='h-auto sm:h-24 w-3/4 lg:w-1/2 my-5'>
          <div className="bottom h-auto min-h-full flex flex-col sm:flex-row flex-wrap items-center justify-between text-zinc-50 px-4 py-2 rounded-xl">
            <p className='flex flex-col items-center p-3'>
              <span className='text-2xl'>{Math.round(weatherData?.wind?.speed ?? 0)} MPH</span>
              <span>Wind Speed</span>
            </p>
            <p className='flex flex-col items-center p-3'>
              <span className='text-2xl'>{Math.round(weatherData?.main?.feels_like ?? 0)}&deg;F</span>
              <span>Feels Like</span>
            </p>
            <p className='flex flex-col items-center p-3'>
              <span className='text-2xl'>{Math.round(weatherData?.main?.humidity ?? 0)}%</span>
              <span>Humidity</span>
            </p>
            <p className='flex flex-col items-center p-3'>
              <span className='text-2xl'>{Math.round(weatherData?.main?.pressure ?? 0)} hPa</span>
              <span>Pressure</span>
            </p>
          </div>
        </div>
        </>
      )}

      {!weatherData?.main && (
        <img className='w-full max-w-xl' src={placeholder} alt="placeholder"/>
      )} 
    </div>
  )
}

export default App;
