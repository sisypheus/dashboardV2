import express from "express";
import {google} from "googleapis";

const router = express.Router();

let OAuth2 = google.auth.OAuth2;
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

const getAuthClient = () => {
  return new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    'http://localhost:8080/service/youtube/auth/callback'
  );
}

router.get('/auth/link', async (req, res) => {
  const url = getAuthClient().generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.send(url);
});

router.get('/auth/callback', async (req, res) => {
  const oauth2Client = getAuthClient();
  const {tokens} = await oauth2Client.getToken(req.query.code);
  console.log(tokens);
  oauth2Client.setCredentials(tokens);
  let service = google.youtube('v3');
  service.search.list({
    auth: oauth2Client,
    part: 'snippet',
    q: 'Wankil Studio',
    type: 'channel',
    maxResults: 1
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    response.data.items.forEach((item) => {
      console.log(item.snippet);
    })
    // console.log(response.data);
    // const channels = response.data.items;
    // if (channels.length == 0) {
    //   console.log('No channel found.');
    // } else {
    //   console.log('This channel\'s ID is %s. Its title is %s, and it has %s views.',
    //     channels[0].id,
    //     channels[0].snippet.title,
    //     channels[0].statistics.viewCount);
    // }
  });
  res.send(tokens);
});

router.get('/token/refresh', async (req, res) => {
  const oauth2Client = getAuthClient();
  const {token, refresh_token,expiry_date, token_type, scope} = req.query;
  oauth2Client.setCredentials({
    access_token: token,
    refresh_token: refresh_token,
    expiry_date: expiry_date,
    token_type: token_type,
    scope: scope
  });
  oauth2Client.refreshAccessToken((err, tokens) => {
    if (err) {
      res.send({err});
    }
    console.log(tokens);
    res.send(tokens);
  });
});

router.get('/search/channel', async (res, req) => {
  const oauth2Client = getAuthClient();
  console.log(req.query.access_token);
  const {tokens} = req.query;
  oauth2Client.setCredentials(tokens);
  let service = google.youtube('v3');
  service.search.list({
    auth: oauth2Client,
    part: 'snippet',
    q: 'Wankil Studio',
    type: 'channel',
    maxResults: 1
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    response.data.items.forEach((item) => {
      console.log(item.snippet);
    })
  });
});

export default router;