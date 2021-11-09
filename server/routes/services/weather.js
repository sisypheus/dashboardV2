import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';

router.get('/:city', async (req, res) => {
  const { city } = req.params;
  await fetch(`${url}${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`).then(response => response.json()).then(data => {
    if (data.main?.temp) {
      console.log(data)
      res.json({
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      })
    } else {
      res.json({
        error: 'City not found'
      });
    }
  })
});

export default router;