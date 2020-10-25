const papa = require('papaparse')
const request = require("request")
const options = {/* options */}
const express = require('express')
module.exports = (req, res) => {
const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

const dataStream = request
    .get("https://projects.fivethirtyeight.com/2020-general-data/presidential_national_toplines_2020.csv")
    .pipe(parseStream);

let data = [];
parseStream.on("data", chunk => {
    data.push(chunk);
});

dataStream.on("finish", () => {
    //console.log(data);
   // console.log(data[0]['candidate_inc'])
   // console.log(data[1][4])
    //console.log(data.length);
//var output = "Polling Information \n";
//console.log(data[0]['candidate_inc'])
//var output = '{ "output" : [' 
var jsonArr = [];
for(x of data){
	jsonArr.push({"Date": x[3], "Candidate_1": x[4], "Result_1": x[23], "Candidate_2": x[5], "Result_2": x[24]});
	//output+='{"Date":"'+x[3]+'",'+'"Candidate_1":"'+x[4]+'",'+'"Result_1":"'+x[23]+'",'+'"Candidate_2":"'+x[5]+'",'+'"Result_2":"'+x[24]+'"},';
	
}
//output+="]}'";

 // console.log(jsonArr);
  res.send(jsonArr);

})
}

