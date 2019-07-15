const request = require('request');
const config = require('../config');

const operations = {
  filterRawData: (rawData) => {
    let filterdData = {};
    /**
     * preparing the obj from the data
     *  returned from Apple api
     */
    rawData.forEach(element => {
      const filteredOBJ = {
        id: element.trackId ? element.trackId : 0, // trackId (ID of entity)
        name: element.collectionName ? element.collectionName : '', // name of entity
        artwork: element.artworkUrl100 ? element.artworkUrl100 : '', // URL of theartwork
        genre: element.primaryGenreName ? element.primaryGenreName : '', // Genre of entity
        url: element.trackViewUrl ? element.trackViewUrl : '' // trackViewUrl
      };
       // checking typeof key 
      if (typeof element.kind !== 'undefined') {
        /**
         * checking if the key is not present
         * in fiteredData
         */
        if (!filterdData[`${element.kind}`]) {
          /**
           * assigning an array and pushing the object
           * that is prepared in line 11
           */
          filterdData[`${element.kind}`] = [];
          filterdData[`${element.kind}`].push(filteredOBJ);
        } else {
          /**
           * if the key exsits we are directly pushing
           * the object that is prepared in line 11
           */
          filterdData[`${element.kind}`].push(filteredOBJ);
        }
      }
    });
    return filterdData;
  },
  // hitting apple api with search term
  callAppleApi: (searchString) => {
    return new Promise((resolve, reject) => {
      request(`${config.appleURL}/search?term=${searchString}`, (error, response, body) => {
        if (error) {
          reject(error)
        } else {
          resolve(JSON.parse(body))
        }
      })
    })
  }
};
module.exports = operations;
