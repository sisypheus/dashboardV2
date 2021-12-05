import dotenv from 'dotenv';
import express from 'express';
import currencyRoutes from './routes/services/currency.js';
import githubRoutes from './routes/services/github.js';
import intraRoutes from './routes/services/intra.js';
import nasaRoutes from './routes/services/nasa.js';
import quoteRoutes from './routes/services/quotes.js';
import redditRoutes from './routes/services/reddit.js';
import weatherRoutes from './routes/services/weather.js';
import youtubeRoutes from './routes/services/youtube.js';
const app = express();


dotenv.config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})
app.enable('trust proxy');

app.use('/service/weather', weatherRoutes);
app.use('/service/currency', currencyRoutes);
app.use('/service/github', githubRoutes);
app.use('/service/reddit', redditRoutes);
app.use('/service/youtube', youtubeRoutes);
app.use('/service/nasa', nasaRoutes);
app.use('/service/quote', quoteRoutes);
app.use('/service/intra', intraRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running')
})

app.get('/about.json', (req, res) => {
  console.log(req.ip.toString());
  let ip;
  if (req.ip.toString().startsWith('::ffff:')) {
    console.log('here');
    ip = req.ip.toString().substring(7);
  } else
    ip = req.ip.toString();
  res.json({
    client: {
      host: ip,
    },
    server: {
      current_time: (new Date().getTime() / 1000).toString().split('.')[0],
      services: [{
        name: "weather",
        widgets: [{
          name: "current",
          description: "Current weather in given city",
          params: [{
            name: "city",
            type: "string",
          }]
        }]
      }, {
        name: "currency",
        widgets: [{
          name: "currency",
          description: "get the current currency rate of given currency",
          params: [{
            name: "from",
            type: "string",
          }, {
            name: "to",
            type: "string",
          }]
        }],
      }, {
        name: "github",
        widgets: [{
          name: "github",
          description: "Get either contribution graph, pinned repos, or stats",
          params: [{
            name: "type",
            type: "string",
          }, {
            name: "token",
            type: "string",
          }],
        }],
      }, {
        name: "reddit",
        widgets: [{
          name: "reddit",
          description: "Get best post of given subreddit",
          params: [{
            name: "subreddit",
            type: "string",
          }, {
            name: "posts",
            type: "number",
          }, {
            name: "token",
            type: "string",
          }],
        }],
      }, {
        name: "youtube",
        widgets: [{
          name: "last",
          description: "Get last video of given channel",
          params: [{
            name: "channel",
            type: "string",
          }, {
            name: "token",
            type: "string",
          }]
        }, {
          name: "stats",
          description: "Get stats of given channel",
          params: [{
            name: "channel",
            type: "string",
          }, {
            name: "token",
            type: "string",
          }]
        }]
      }, {
        name: "nasa",
        widgets: [{
          name: "picture",
          description: "Get a picture from nasa",
          params: [{
            name: "type",
            type: "string",
          }]
        }]
      }, {
        name: "quote",
        widgets: [{
          name: "qod",
          description: "Get quote of the day in given category",
          params: [{
            name: "category",
            type: "string",
          }]
        }, {
          name: "random",
          description: "Get random quote in given category",
          params: [{
            name: "category",
            type: "string",
          }]
        }]
      }, {
        name: "intra",
        widgets: [{
          name: "intra",
          description: "Get either notifications or stats",
          params: [{
            name: "type",
            type: "string",
          }, {
            name: "token",
            type: "string",
          }]
        }]
      }],
    }
  })
})

process.on('SIGINT', () => (process.exit(1)));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening`);
})