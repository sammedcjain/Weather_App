//jshint esversion:6
const express = require('express');
const https=require("https");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

  //res.send("server is up");
});


app.post('/',function(req,res){
  console.log(req.body.cityName);
  console.log("post received");

  const city=req.body.cityName;
  const api=process.env.BLANCK;
  const units="metric";
  https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+units,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    const weatherdata = JSON.parse(data);
    const temp = weatherdata.main.temp;
    const desc= weatherdata.weather[0].description;
    const iconid=weatherdata.weather[0].icon;
    const imageurl="http://openweathermap.org/img/wn/"+iconid+"@2x.png";
    // res.write("<h1> temperature in "+city+" = "+temp+" in deg celsius</h1>");
    // res.write("<h3>The weather is currently "+desc+"</h3>");
    // res.write("<img src="+imageurl+">");
    // res.send();
    res.write('<!DOCTYPE html> <html> <head> <title>Weather Status</title> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> <style> .weather-card { background-color: #9aa3b3; padding: 10px; } </style> </head> <body> <div class="container-fluid"> <div class="row"> <div class="col-md-12"> <div class="weather-card text-center"> <h3>Weather Status for '+city+'</h3> <h4>Temperature:  '+temp+' in celsius</h4> <img src="'+imageurl+'" alt="sun icon" width="150px"> <h4>The weather is currently '+desc+' </h4> </div> </div> </div> </div> </body> </html>');
    res.send();
  });

  });
});

app.listen(3000,function(){
  console.log("operating in port 3000");
});
