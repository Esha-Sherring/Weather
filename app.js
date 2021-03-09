const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '976c7b488b04ceb04bb9a009d2730021';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('views/index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
      console.log(err);
    } else {
      let weather = JSON.parse(body)
      console.log(weather);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
        console.log(weather.main);
      } else {
        let temp = `It's ${weather.main.temp} degrees in ${weather.name}! but it feels like ${weather.main.feels_like}.`;
        let humidity=`Humidity : ${weather.main.humidity} percent`;
        let min=`Minimum temperature : ${weather.main.temp_min}`;
        let max=`Maximum temperature : ${weather.main.temp_max}`;
        let pressure=`Pressure : ${weather.main.pressure} Pa`;
        res.render('index', {weather: temp,humidity:humidity,max:max,min:min,pressure:pressure,error: null});
      
      }
    }
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})