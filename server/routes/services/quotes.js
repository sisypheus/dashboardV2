import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const response = await axios.get(`https://quotes.rest/quote/categories/popular?limit=100&api_key=${process.env.QUOTES_API_KEY}`);
    let categories = response.data.contents.categories.map(category => category.name);
    res.send(categories);
  } catch (error) {
    res.send({ err: 'Something went wrong' });
  }
})

router.get('/qod/categories', async (req, res) => {
  console.log('ici');
  try {
    const response = await axios.get(`https://quotes.rest/qod/categories?api_key=${process.env.QUOTES_API_KEY}`);
    console.log(response.data);
    res.send(Object.keys(response.data.contents.categories));
  } catch (error) {
    res.send({ err: 'Something went wrong' });
  }
});

router.get('/qod/:category', async (req, res) => {
  try {
    const response = await axios.get(`https://quotes.rest/qod.json?api_key=${process.env.QUOTES_API_KEY}&category=${req.params.category}`);
    res.send(response.data);
  } catch (error) {
    res.send({ err: 'Something went wrong' });
  }
})

router.get('/random/:category', async (req, res) => {
  try {
    const response = await axios.get(`https://quotes.rest/quote/random?category=${req.params.category}&api_key=${process.env.QUOTES_API_KEY}`);
    res.send(response.data);
  } catch (error) {
    res.send({ err: 'Something went wrong' });
  }
})

export default router;