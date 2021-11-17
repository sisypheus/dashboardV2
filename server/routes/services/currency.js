import express, { application } from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const url = 'https://api.coinbase.com/v2/exchange-rates';

router.get('/currencies', async (req, res) => {
  await fetch(url).then(response => response.json()).then(data => {
    if (data.data?.rates)
      res.json(data.data.rates);
    else
      res.json({ error: 'No data' });
  }).catch(err => {
    res.json({ error: err });
  });
});

router.get('/rates', async (req, res) => {
  let { pair1, pair2 } = req.query;
  pair1 = pair1.toUpperCase();
  pair2 = pair2.toUpperCase();

  await fetch(url + `?currency=${pair1}`).then(response => response.json()).then(data => {
    if (data.data?.rates)
      res.send({ rate: data.data.rates[pair2] })
    else
      res.json({ error: 'No data' });
  }).catch(err => {
    res.json({ error: err });
  })
});

export default router;