import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/auth/link', async (req, res) => {
  res.send(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=random&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&scope=account,identity,read&duration=permanent`)
});

router.get('/token/refresh', async (req, res) => {
  const { refresh_token } = req.query;

  console.log(refresh_token, 'refresh token');
  try {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    }).then(res => res.json()).then(data => {
      data.expires_in = ((data.expires_in + new Date().getTime() / 1000)).toString().split('.')[0];
      res.send(data);
    });
  } catch (e) {
    console.log(e);
    res.send({ error: 'Something went wrong' });
  }
})

router.get('/auth/fetch_code', async (req, res) => {
  const { code } = req.query;
  console.log(code);
  const form = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDDIT_REDIRECT_URI
  })

  const credentials = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
  fetch('https://www.reddit.com/api/v1/access_token', {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`
    },
    body: form
  }).then(response =>
    response.json()
  ).then(data => {
    data.expires_in = ((data.expires_in + new Date().getTime() / 1000)).toString().split('.')[0];
    res.send(data)
  }
  ).catch(error => res.send({ err: error }));
})

router.get('/subreddit', async (req, res) => {
  const { token, subreddit, number } = req.query;

  try {
    fetch(`https://oauth.reddit.com/r/${subreddit}/best?limit=${number}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        res.send(data)
      }).catch(error => res.send({ err: error }));
  } catch (e) {
    console.log(e);
    res.send({ err: 'Something went wrong' });
  }
});

export default router;