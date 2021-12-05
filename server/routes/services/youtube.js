import express from "express";
import { google } from "googleapis";

const router = express.Router();

let OAuth2 = google.auth.OAuth2;
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

const getAuthClient = () => {
  return new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    'http://localhost:3000/youtube',
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
    console.log(err);
    return -1;
  });
  return id;
}

router.get('/channel/id', async (req, res) => {
  const client = getAuthClient();
  const channel = req.query.channel;
  console.log(channel);
  const tokens = req.query;
  client.setCredentials(tokens);
  const id = await getChannelId(channel, client);
  res.send({ id });
})

router.get('/auth/link', async (req, res) => {
  const url = getAuthClient().generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.send(url);
});

router.get('/auth/token', async (req, res) => {
  const oauth2Client = getAuthClient();
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    res.send(tokens);
  } catch (err) {
    res.send({ err: err });
  }
})

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
  const channelId = req.query.channelId;
  oauth2Client.setCredentials(tokens);
  // const channelId = await getChannelId(channel, oauth2Client);

  if (channelId === -1)
    res.send({ err: 'Channel not found' });

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
      res.send({ err });
    } else {
      res.send(response.data.items[0]);
    }
  });
});

router.get('/channel/stats', async (req, res) => {
  const oauth2Client = getAuthClient();
  const tokens = req.query;
  const channel = req.query.channel;
  const channelId = req.query.channelId;
  oauth2Client.setCredentials(tokens);
  // const channelId = await getChannelId(channel, oauth2Client);

  if (channelId === -1)
    res.send({ err: 'Channel not found' });

  let service = google.youtube('v3');
  service.channels.list({
    auth: oauth2Client,
    part: 'snippet,statistics',
    id: channelId,
    maxResults: 1
  }, (err, response) => {
    if (err) {
      // console.log(err, 'fdsjqkm');
      res.send({ err });
    } else {
      if (response.data.pageInfo.totalResults === 0)
        res.send({ err: 'Channel not found' });
      else
        res.send({ logo: response.data.items[0].snippet.thumbnails.default.url, title: response.data.items[0].snippet.title, views: response.data.items[0].statistics.viewCount, subscribers: response.data.items[0].statistics.subscriberCount, videos: response.data.items[0].statistics.videoCount });
    }
  })
})

export default router;