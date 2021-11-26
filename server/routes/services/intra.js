import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const email = async (autologin) => {
  const response = await fetch(`${autologin}/user/?format=json`).then((res) => res.json());
  return response.login;
};

router.get('/stats', async (req, res) => {
  const {autologin} = req.query;
  
  try {
    const response = await fetch(`${autologin}/user/?format=json`).then((res) => res.json());
    res.send({credits: response.credits, gpa: response.gpa[0].gpa});
  } catch {
    res.send({err: 'Something went wrong'});
  }
});

router.get('/notifications', async (req, res) => {
  const {autologin} = req.query;
  
  try {
    const login = await email(autologin);
    const response = await fetch(`${autologin}/user/${login}/notification/message?format=json`).then((res) => res.json());
    let formated = response.map((notification) => notification.title);
    res.send(formated);
  } catch {
    res.send({err: 'Something went wrong'});
  }
})

export default router;