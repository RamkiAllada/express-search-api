const express = require('express');
const router = express.Router();
const config = require('../config');
const operations = require('./operations');

/**
 *Search metho with search term as
 * input and calling the Apple Api 
 */
router.get('/search', (req, res, next)=> {
  // restrict it to the required domain
  res.header("Access-Control-Allow-Origin", "*");
  // calling apple api from operations file
  operations.callAppleApi(`${req.query.term}`).then(data=>{ 
  // filtering the data returned from Apple api  
    res.send(operations.filterRawData(data.results));
  }).catch((error)=> {
    res.send(error);
  });
});

module.exports = router;
