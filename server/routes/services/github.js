import express from "express";
import fetch from "node-fetch";
import axios from "axios";

const router = express.Router();

const getUsername = async (token) => {
  try {

    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());

    return response.login;
  } catch (error) {
    return -1;
  }
}

router.get('/user/token', async (req, res) => {
  const code = req.query.code;

  const token = await axios.post('https://github.com/login/oauth/access_token?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret=' + process.env.GITHUB_SECRET + '&code=' + code)
    .then(response => {
      return response.data;
    })
  const params = new URLSearchParams(token);
  const access_token = params.get('access_token');
  res.json({ access_token });
});

router.get('/contributions', async (req, res) => {
  const token = req.query.token;
  const username = await getUsername(token);
  if (username === -1) {
    res.json({ err: 'Invalid token' });
    return;
  }
  res.json({ username });
})

router.get('/pinned', async (req, res) => {
  const token = req.query.token;
  const username = await getUsername(token);

  if (username === -1)
    res.json({ err: "Something went wrong" });

  const query = `
  {
    user(login: "${username}") {
      pinnedItems(first: 6, types: [REPOSITORY, GIST]) {
        totalCount
        edges {
          node {
            ... on Repository {
              name
              description
              forks {
                totalCount
              }
              stargazerCount
            }
          }
        }
      }
    }
  }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query })
    }).then(res => res.json());
    res.send(response);
  } catch (error) {
    res.json({ err: "Something went wrong" });
  }
})

router.get('/profile', async (req, res) => {
  const token = req.query.token;
  const username = await getUsername(token);

  if (username === -1) {
    res.json({ err: "Something went wrong" });
  }

  const query = `
  {
    user(login: "${username}") {
      name
      bio
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
    }
  }`;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query })
    }).then(res => res.json());
    res.send(response);
  } catch (error) {
    res.json({ err: "Something went wrong" });
  }
})

export default router;