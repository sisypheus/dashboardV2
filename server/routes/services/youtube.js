import express from "express";
import { google } from "googleapis";

const router = express.Router();

let OAuth2 = google.auth.OAuth2;
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

const getAuthClient = () => {
  return new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    //change this for the front end
    'http://localhost:8080/service/youtube/auth/callback'
  );
}

const getChannelId = async (query, client) => {
  let service = google.youtube('v3');
  const id = await service.search.list({
    auth: client,
    q: query,
    part: 'snippet',
    type: 'channel',
    maxResults: 1
  }).then((response) => {
    return response.data.items[0].id.channelId;
  }).catch((err) => {
    return -1;
  });
  return id;
}

router.get('/auth/link', async (req, res) => {
  const url = getAuthClient().generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.send(url);
});

//this must be handled by the frontend
router.get('/auth/callback', async (req, res) => {
  const oauth2Client = getAuthClient();
  const { tokens } = await oauth2Client.getToken(req.query.code);
  console.log(tokens);
  res.send(tokens);
});

// router.get('/token/refresh', async (req, res) => {
//   const oauth2Client = getAuthClient();
//   const {token, refresh_token,expiry_date, token_type, scope} = req.query;
//   oauth2Client.setCredentials({
//     access_token: token,
//     refresh_token: refresh_token,
//     expiry_date: expiry_date,
//     token_type: token_type,
//     scope: scope
//   });
//   oauth2Client.refreshAccessToken((err, tokens) => {
//     if (err) {
//       res.send({err});
//     }
//     console.log(tokens);
//     res.send(tokens);
//   });
// });


router.get('/channel/video/last', async (req, res) => {
  const oauth2Client = getAuthClient();
  const tokens = req.query;
  const channel = req.query.channel;
  oauth2Client.setCredentials(tokens);
  const channelId = await getChannelId(channel, oauth2Client);
  let service = google.youtube('v3');

  service.search.list({
    auth: oauth2Client,
    part: 'snippet',
    channelId: channelId,
    maxResults: 1,
    order: 'date',
    type: 'video'
  }, (err, response) => {
    if (err) {
      res.send({err});
    } else {
      res.send(response.data.items[0]);
    }
  });
});

router.get('/channel/stats', async (req, res) => {
  const oauth2Client = getAuthClient();
  const tokens = req.query;
  const channel = req.query.channel;
  oauth2Client.setCredentials(tokens);
  const channelId = await getChannelId(channel, oauth2Client);
  let service = google.youtube('v3');

  service.channels.list({
    auth: oauth2Client,
    part: 'snippet,statistics',
    id: channelId,
  }, (err, response) => {
    if (err) {
      res.send({err});
    } else {
      if (response.data.items.length > 0)
        res.send({logo: response.data.items[0].snippet.thumbnails.default.url, title: response.data.items[0].snippet.title, views: response.data.items[0].statistics.viewCount, subscribers: response.data.items[0].statistics.subscriberCount, videos: response.data.items[0].statistics.videoCount});
      else
        res.send({err: 'No channel found'});
    }
  })
})

export default router;