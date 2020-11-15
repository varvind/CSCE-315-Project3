const papa = require('papaparse')
const request = require("request")
const options = {/* options */}
const express = require('express')
module.exports = (req, res) => {
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

  const dataStream = request
      .get("https://projects.fivethirtyeight.com/2020-general-data/presidential_polls_2020.csv")
      .pipe(parseStream);

  let data = [];
  parseStream.on("data", chunk => {
      data.push(chunk);
  });

  dataStream.on("finish", () => {
    
  var jsonArr = [];
  var currentstate ="Wyoming";
  var statecount = 0;
  var switcharoo = false
 // console.log("Start")
  for(x of data){
    if(statecount==3 || x[1]!=currentstate){
      switcharoo=true
    // console.log("SWITCH")
    }
   // console.log(x[1])
    if(switcharoo){
       statecount = 0;
      // console.log("WAIT")

    if(x[1]!=currentstate){
      //console.log("NOT EQUAL")
      currentstate = x[1]
       switcharoo=false;
       //console.log({"state": x[1], "Candidate_1": x[3], "Date": x[2], "Result": x[11]});
       if(x[3]=="Joseph R. Biden Jr."){
       jsonArr.push({"state": x[1], "Candidate_1": x[3], "Date": x[2], "Result": x[11]});
     }
    }


    }
    else if(currentstate == x[1] && !switcharoo){

       if(x[3]=="Joseph R. Biden Jr."){
       jsonArr.push({"state": x[1], "Candidate_1": x[3], "Date": x[2], "Result": x[11]});
     }
       console.log({"state": x[1], "Candidate_1": x[3], "Date": x[2], "Result": x[11]});
       statecount+=1
    }
    
    
    
   
    //output+='{"Date":"'+x[3]+'",'+'"Candidate_1":"'+x[4]+'",'+'"Result_1":"'+x[23]+'",'+'"Candidate_2":"'+x[5]+'",'+'"Result_2":"'+x[24]+'"},';
    
  }
  //output+="]}'";

  // console.log(jsonArr);
    res.send(jsonArr);

  })
}

