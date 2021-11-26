import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/categories', async (req, res) => {
  const response = await axios.get(`https://quotes.rest/quote/categories/popular?limit=100&api_key=${process.env.QUOTES_API_KEY}`);
  res.send(response.data); 
})

router.get('/qod/:category', async (req, res) => {
  const response = await axios.get(`https://quotes.rest/qod.json?category=${req.params.category}&api_key=${process.env.QUOTES_API_KEY}`);
  res.send(response.data); 
})

router.get('/random/:category', async (req, res) => {
  const response = await axios.get(`https://quotes.rest/quote/random?category=${req.params.category}&api_key=${process.env.QUOTES_API_KEY}`);
  res.send(response.data); 
})

export default router;