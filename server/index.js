import express from 'express';
const app = express();
import dotenv from 'dotenv';

import weatherRoutes from './routes/services/weather.js';
import currencyRoutes from './routes/services/currency.js';
import githubRoutes from './routes/services/github.js';
import redditRoutes from './routes/services/reddit.js';
import youtubeRoutes from './routes/services/youtube.js';

dotenv.config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.set('trust proxy', true);

app.use('/service/weather', weatherRoutes);
app.use('/service/currency', currencyRoutes);
app.use('/service/github', githubRoutes);
app.use('/service/reddit', redditRoutes);
app.use('/service/youtube', youtubeRoutes);

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