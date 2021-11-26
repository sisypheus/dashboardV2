import express from "express";
import axios from "axios";

const router = express.Router();

router.get('/apod', async (req, res) => {
  try {
    const apod = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    res.send(apod.data);  
  } catch (error) {
    res.send({err: error});
  }
})

router.get('/mars', async (req, res) => {
  try {
    const mars = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.NASA_API_KEY}`);
    res.send({img_src: mars.data?.latest_photos[0]?.img_src});
  } catch (error) {
    res.send({err: error});
  }
})

export default router;