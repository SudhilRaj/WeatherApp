import { Helmet } from 'react-helmet';

const HelmetHead = () => {
   return (
      <Helmet>
         <title>Weather App</title>
         <meta name='description' content='Current Weather App'/>
         <meta name='keywords' content='Weather App, Weather App Netlify, srk-weather-app'/>
         <meta property='og:type' content='Website'/>
         <meta property='og:title' content='Weather App'/>
         <meta property='og:description' content='Current Weather App'/>
      </Helmet>
   )
}

export default HelmetHead;