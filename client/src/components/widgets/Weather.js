import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({display, city}) => {
  const [weather, setWeather] = useState({});
  if (!city) {
    city = 'Lille'
  }
  useEffect(() => {
    let isCancelled = false;
    axios.get(process.env.REACT_APP_API + '/service/weather/' + city)
      .then(res => {
        if (!isCancelled)
          setWeather(res.data);
      })
    return () => {
      isCancelled = true;
    }
  }, []);

  return (
    <>
    {display !== false && 
    <div key="weather" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
      <p className="text-xl">Weather</p>
      <p>{city.charAt(0).toUpperCase() + city.slice(1)}</p>
      <p>{weather?.temp}</p>
      { weather?.icon && <img className="w-20" src={'https://openweathermap.org/img/w/' + weather?.icon + '.png'} alt="weather" /> }
    </div>
    }
    </>
  )
}

export default Weather
