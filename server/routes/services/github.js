import  express  from "express";
import fetch from "node-fetch";
import axios from "axios";

const router = express.Router();

router.get('/user/token', async (req, res) => {
  const code = req.query.code;

  const token = await axios.post('https://github.com/login/oauth/access_token?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret=' + process.env.GITHUB_SECRET + '&code=' + code)
  .then(response => {
    return response.data;
  })
  const params = new URLSearchParams(token);
  const access_token = params.get('access_token');
  res.json({access_token});
});

export default router;