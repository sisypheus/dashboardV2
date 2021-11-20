import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';

import weatherRoutes from './routes/services/weather.js';
import currencyRoutes from './routes/services/currency.js';
import githubRoutes from './routes/services/github.js';

dotenv.config();
app.use(cors());

app.set('trust proxy', true);

app.use('/service/weather', weatherRoutes);
app.use('/service/currency', currencyRoutes);
app.use('/service/github', githubRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running')
})

app.get('/about.json', (req, res) => {
  console.log(req.ip.toString());
  res.json({
    client: {
      host: req.ip
    },
    server: {
      current_time: (new Date().getTime() / 1000).toString().split('.')[0],
      services: [{
        name: "weather",
        widgets: "city weather",
        description: "get the temperature and brief description of current weather in given city",
        params: [{
          name: "city",
          type: "string"
        }]
      }]
    }
  })
});

process.on('SIGINT', () => (process.exit(1)));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening`);
})