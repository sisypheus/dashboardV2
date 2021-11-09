import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';

import weatherRoutes from './routes/services/weather.js';

dotenv.config();
app.use(cors());

app.use('/service/weather', weatherRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about.json', (req, res) => {
  res.json({
    name: 'John Doe',
    age: 30
  })
});

app.get

app.listen(process.env.PORT || 3001, () => {
  console.log(`Example app listening`);
})