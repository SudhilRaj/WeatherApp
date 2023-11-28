import { useState } from 'react';
import { getName as getCountry} from 'country-list';
import HelmetHead from './HelmetHead';
import constants from './constants';
import darkBg from './assets/bg4.gif';
import lightBg from './assets/bg6.gif';
import placeholder from './assets/season.svg';
import { getThemeClasses } from './utils';
import { useTheme } from './context/ThemeContext';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const App = () => {
  <HelmetHead />

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');

  const getWeather = () => {
    fetch(`${constants.API_URL}?q=${city}&units=metric&appid=${constants.WEATHER_MAP_API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))
  }

  // Getting Theme context values
  // Note: Since this application only have a main component, using a context for setting and changing the theme variable is actually not necessary.
  // The context approach is more organized, and will be more helpful when it comes to multiple components.
  // Currently, we are using the tailwind's default darkMode setup. Even though we are utilizing the values from the context, we can simply create a toggle 
  // theme setup within the component, the context setup is not necessary.

  // const{ theme, dispatch } = useContext(ThemeContext); //useReducer with context Approach - Keeping for reference
  const { darkMode, toggleDarkMode } = useTheme();
  const changeTheme = () => {
    toggleDarkMode();
    // darkMode ? dispatch({ type: 'LIGHTMODE' }) : dispatch({ type: 'DARKMODE' }) //useReducer with context Approach - Keeping for reference
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='flex flex-col items-center justify-between p-12 h-screen bg-cover bg-center 
        bg-no-repeat text-neutral-900 dark:text-slate-200 overflow-y-auto bg-gray-100 dark:bg-gray-900'
        style={{ backgroundImage: `url(${darkMode ? darkBg : lightBg})` }}
      >
        {/* <button className={`${getThemeClasses('button')}`}
        onClick={changeTheme}>{darkMode ? 'Switch to Light' : 'Switch to Dark'}</button>
        <p className={getThemeClasses('text')}>
          Test Theme Change
        </p> */}

        <div className='absolute top-5 right-5'>
          <Switch
            checked={darkMode}
            onChange={changeTheme}
            className='bg-yellow-300 dark:bg-gray-800
              relative inline-flex h-[28px] w-[64px] shrink-0 mb-2 cursor-pointer rounded-full border-2 border-gray-200 
              dark:border-zinc-500 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 
              focus-visible:ring-white/75'
          >
            <span className="sr-only">Dark Mode</span>
            <span
              aria-hidden="true"
              className='translate-x-0 dark:translate-x-9
                pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full
                bg-slate-100 shadow-lg ring-0 transition duration-200 ease-in-out'
            >
              {darkMode ? <MoonIcon className="text-gray-700" /> : <SunIcon className="text-yellow-500" />}
            </span>
          </Switch>
        </div>
        
        <div className='flex flex-col items-center w-full'>
          <h1 className='text-4xl font-semibold py-4 text-center'>Weather App</h1>
          <input
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter a city to get current weather'
            onKeyUp={getWeather}
            autoComplete='off'
            className='w-3/4 lg:w-1/2 m-0 p-3 text-neutral-900 bg-slate-200 border-none rounded sm:rounded-md
            text-md sm:text-xl focus:outline-none ring-offset-2 ring ring-gray-200'
          />
        </div>

        {weatherData?.cod === '404' && (
          <p className='text-xl pt-4'>{weatherData?.message}</p>
        )}

        {weatherData?.main && (
          <>
          <div className='flex flex-col items-center mt-10'>
              <p className='text-3xl font-light text-center text-balance'>
                {weatherData?.name || '-'} {weatherData?.sys?.country && <span>({getCountry(weatherData.sys.country)})</span>}
              </p>
              <p className='text-7xl font-semibold p-5 my-4 border-solid border-2 border-slate-400 rounded-xl'>
                {Math.round(weatherData?.main?.temp || 0)}&deg;C
              </p>
              <p className='flex items-center text-3xl font-light'>
                {weatherData?.weather?.[0]?.icon && 
                  <img className='w-20' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather'/>
                }
                <span>{weatherData?.weather?.[0]?.main || '-'} </span>
              </p>  
          </div>
        
          <div className='w-3/4 lg:w-1/2 my-5'>
            <div className='h-auto min-h-full flex flex-col sm:flex-row flex-wrap items-center justify-between
              text-neutral-900 dark:text-slate-200 bg-slate-400/10 dark:bg-white/20 px-4 py-2 rounded-xl'
            >
              <p className='flex flex-col items-center px-3 py-4'>
                <span className='text-2xl'>{Math.round(weatherData?.wind?.speed ?? 0)} m/s</span>
                <span>Wind Speed</span>
              </p>
              <p className='flex flex-col items-center px-3 py-4'>
                <span className='text-2xl'>{Math.round(weatherData?.main?.feels_like ?? 0)}&deg;C</span>
                <span>Feels Like</span>
              </p>
              <p className='flex flex-col items-center px-3 py-4'>
                <span className='text-2xl'>{Math.round(weatherData?.main?.humidity ?? 0)}%</span>
                <span>Humidity</span>
              </p>
              <p className='flex flex-col items-center px-3 py-4'>
                <span className='text-2xl'>{Math.round(weatherData?.main?.pressure ?? 0)} hPa</span>
                <span>Pressure</span>
              </p>
            </div>
          </div>
          </>
        )}

        {!weatherData?.main && (
          <div className='mt-8'>
            <img className='w-full max-w-xl' src={placeholder} alt='placeholder'/>
          </div>
        )}

        <div className='text-center pt-4 text-balance'>
          © {new Date().getFullYear()}, <a href='https://github.com/SudhilRaj' target='_blank' className='underline'>Sudhil Raj</a> 
          <span> | Made with <span className='text-red-400'>&#9829;</span> using React</span>
        </div>
      </div>
    </div>
  )
}

export default App;
