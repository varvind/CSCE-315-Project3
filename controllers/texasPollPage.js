const papa = require('papaparse')
const request = require("request")
const options = {/* options */}
const express = require('express')
module.exports = (req, res) => {
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

const dataStream = request
    .get("https://projects.fivethirtyeight.com/polls-page/senate_polls.csv")
    .pipe(parseStream);

let data = [];
parseStream.on("data", chunk => {
    data.push(chunk);
});

dataStream.on("finish", () => {
   
var jsonArr = [];
for(x of data){
	if(x[3]=="Texas" && x[2]=="2020"){
		jsonArr.push({"Date": x[20], "Candidate": x[33], "Party": x[36], "Result": x[37]});
	}
	
	
}

  res.send(jsonArr);

})
}

