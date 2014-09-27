var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var Bullseye = require('./Bullseye.js');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send(cool())
})

app.get('/create-account/', function(request, response) {
	var username = request.query.user;
	var result = Bullseye.createAccount(username);
	response.send(JSON.stringify(result));
})

app.get('/ping/', function(request, response) {
	var username = request.query.user;
	var result = Bullseye.ping(username);
	response.send(JSON.stringify(result));
})

app.get('/get-info/', function(request, response) {
	var username = request.query.user;
	var result = Bullseye.getValues(username);
	response.send(JSON.stringify(result));
})

app.get('/buy-upgrade/', function(request, response) {
	var username = request.query.user;
	var index = request.query.index;
	var result = Bullseye.buyUpgrade(username, index);
	response.send(JSON.stringify(result));
})

app.get('/add-money/', function(request, response) {
	var username = request.query.user;
	var result = Bullseye.addMoney(username);
	response.send(JSON.stringify(result));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

