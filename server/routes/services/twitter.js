import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import OAuth1a from 'oauth-1.0a';
import { TwitterApi } from 'twitter-api-v2';

const router = express.Router();

router.get('/user/link', async (req, res) => {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
  })

  const authLink = await client.generateAuthLink('http://localhost:3000');
  res.send(authLink.url);
});

router.get('/user/token', async (req, res) => {

});

router.get('/user/callback', async (req, res) => {
  // ça n'a aucun sens on a déja le token
  //pour savoir si le client a accepté, il faut juste regarder si oauth_verifier est présent dans la query
  const { oauth_token, oauth_verifier } = req.query;
  const { oauth_token_secret } = req.session;

  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    return res.status(400).send('You denied the app or your session expired!');
  }

  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessSecret: oauth_token_secret,
    accessToken: oauth_token,
  });

  client.login(oauth_verifier).then((user) => {res.send(user)});
});

export default router;