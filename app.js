const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=eb8e317267d6ea588d55e5201f1aabd7&units=metric

app.post('/', function(req, res) {
	// console.log(req.body.cityName);
	const query = req.body.cityName;
	const apiKey = 'eb8e317267d6ea588d55e5201f1aabd7';
	const unit = 'metric';
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;

	https.get(url, function(response) {
		response.on('data', function(data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(`<h4> The weather is ${description}</h4>`);
			res.write(`<h2>The temperature in ${query} is ${temp} degrees celcius </h2>`);
			res.write(`<img src=${imageUrl}>`);
			res.send();
		});
	});
});

app.listen(3000, function() {
	console.log('Server is Running on Port:3000!');
});
