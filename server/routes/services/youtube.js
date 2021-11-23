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

router.get('/auth/token', async (req, res) => {
  const url = getAuthClient().generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
  res.send(url);
});

router.get('/auth/callback', async (req, res) => {
  const oauth2Client = getAuthClient();
  const {tokens} = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  res.send(tokens);
});

export default router;