const fs = require("fs");
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

require("dotenv").config();

//initialize Discovery and set default query parameters
const discovery = new DiscoveryV1({
  version: process.env.DISCOVERY_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.DISCOVERY_API_KEY,
  }),
  url: process.env.DISCOVERY_URL,
});

const queryParams = {
  environmentId: process.env.DISCOVERY_ENVIRON,
  collectionId: process.env.DISCOVERY_COLLECTION,
  count: 364,
};

let resultsPath = __dirname + "/Lab2/DiscoveryResults/DiscoveryOutput.json";

//Call Discovery API in order to perform NLP enrichments and save results array as a JSON file
discovery.query(queryParams).then(queryResponse => {
  var jsonData = JSON.stringify(queryResponse, null, 4);
	var data = JSON.parse(jsonData);
	var results = data.result.results;
	var json = JSON.stringify(results, null, 2);
  fs.writeFile(resultsPath, json, (err) =>{
    if(err){
      console.log(err);
    } else {
      console.log('Wrote successfully');
    }
  });
});
