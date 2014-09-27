var Player = require('./Player.js');
var request = require('request');
var players = {};
var apiKey = 'J5PsS2XGuqCnkdQq0Let6RSfvU7oyPwF';

exports.createAccount = function(username) {
	if (players[username]) {
		return false;
	}
	players[username] = Player(username);
	return true;
}

exports.addMoney = function(username) {
	var player = players[username];
	return player && player.money += 5000;
}

exports.scanObject = function(username, upc) {

}

exports.startTask = function(username, index) {

}

exports.buyUpgrade = function(username, index) {
	var player = players[username];
	return player && player.startUpgrade(index);
}

exports.getValues = function(username) {
	return players[username];
}

exports.getUpgrades = function(username) {
	var player = players[username];
	return player && player.getUpgrades();
}

exports.getTasks = function(username) {
	var player = players[username];
	return player && player.getTasks();
}

exports.ping = function(username) {
	var player = players[username];
	return player && player.ping();
}

exports.getAisleOfScan = function(longtitude, latitude, upc)
{
	var storeID = '';
	var productID = '';
	request(
		'http://api.target.com/v2/store?nearby=' + longtitude + ',' + latitude + '&range=10&limit=100&locale=en-US&key='+  apiKey,
		function (error, response, body)
		{
			if (!error && response.statusCode == 200)
			{
				// Search for <ID>storeID</ID> and storeID = first found
			}
		}
	);
	request(
		'http://api.target.com/v2/products/' + upc + '?idType=UPC&key=' + apiKey,
		function (error, response, body)
		{
			if (!error && response.statusCode == 200)
			{
				// Search for "DPCI": "242-13-5424" and productID =  first found
			}
		}
	);
	request(
		'http://api.target.com/v2/products/availability?'+productID+'=070-09-0141&'+storeID+'=694&key=' + apiKey,
		function (error, response, body)
		{
			if (!error && response.statusCode == 200)
			{
				// Search for "Aisle": 17 and return first found
			}
		}
	);
}
