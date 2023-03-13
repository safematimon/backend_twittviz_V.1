const express = require("express");
const router = express.Router();
const twitter= require('twitter')
const twitterV2 = require('twitter-v2');
const {languagesCode} = require('../mapping/languagesCode')
const Trend = require('../models/Trend');

// twitter v1 for trend
const client = new twitter({
    consumer_key:process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret:process.env.TWITTER_CONSUMER_API_SECRET,
    access_token_key:process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:process.env.TWITTER_ACCESS_SECRET,
  })
  // twitter v2 for tweet lookup and recent
  const clientV2 = new twitterV2({
    consumer_key:process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret:process.env.TWITTER_CONSUMER_API_SECRET,
    access_token_key:process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:process.env.TWITTER_ACCESS_SECRET,
  })
  // twitter v3 for count
  const clientV3 = new twitterV2({
    bearer_token: process.env.BEARER_TOKEN,
  });

router.get('/trends', async (req, res, next) => {
  try{
    const id = req.query.woeid
    const data = await client.get('trends/place.json', {
      id,
    })
    res.send(data);
  }catch(error){
    next(error)
  }
});

router.get('/update-trends', async (req, res, next) => {
  try {
    const id = 1
    const data = await client.get('trends/place.json', {id})

    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${hours}/${day}/${month}/${year}`;
    
    const datatemp = data[0].trends

    datatemp.forEach((item, index) => {
      item.time = formattedDate;
      item.no = index+1;
    });

    Trend.insertMany(datatemp)
    console.log("Data inserted",new Date(),">",formattedDate)  // Success
    
    res.status(200).send("inserted");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating trends');
  }
});


router.get("/eiei", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

router.get('/test', async (req, res, next) => {
    res.send({ message: 'test api OK is working 🚀' });
  });



module.exports = router;