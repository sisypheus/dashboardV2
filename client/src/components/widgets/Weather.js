import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const Weather = ({ refresh, display, city }) => {
  const [weather, setWeather] = useState({});
  if (!city) {
    city = 'Lille'
  }

  useEffect(() => {
    if (display)
      getWeather()
    if (refresh) {
      const interval = setInterval(() => {
        console.log('refresh weather widget')
        if (display)
          getWeather()
      }, refresh * 1000 * 60);
      return () => {
        clearInterval(interval);
      }
    }
  }, []);

  const getWeather = async () => {
    const res = await axios.get(process.env.REACT_APP_API + '/service/weather/' + city);
    setWeather(res.data);
  }

  return (
    <>
      {display !== false &&
        <div key="weather" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-purple text-2xl tracking-widest font-black">Weather</p>
          <p className="pt-2 font-bold text-text text-xl">{city.charAt(0).toUpperCase() + city.slice(1)}</p>
          <p className="text-purple">{weather?.temp} °C</p>
          <p className="pt-2 text-text italic">Feels like: {weather?.feels_like} °C</p>
          {weather?.icon && <img className="w-20" src={'https://openweathermap.org/img/w/' + weather?.icon + '.png'} alt="weather" />}
        </div>
      }
    </>
  )
}

export default Weather
