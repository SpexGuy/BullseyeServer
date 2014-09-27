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
	return player && (player.money += 5000);
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

exports.scanObject = function(username, latitude, longitude, upc) {
	var player = players[username];
	if (!player) return false;
	this.getAisleOfScan(player, longitude, latitude, upc);
	return true;
}

exports.getAisleOfScan = function(player, longitude, latitude, upc) {
	request(
		{
			uri: 'http://api.target.com/v2/store?nearby=' + longitude + ',' + latitude + '&range=10&limit=100&locale=en-US&key='+  apiKey,
			headers: {
				Accept: "application/json"
			}
		},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var stores = JSON.parse(response.body);
				var storeId = stores.Locations.Location[0].ID;
				
				request(
					{
						uri: 'http://api.target.com/v2/products/' + upc + '?idType=UPC&key=' + apiKey,
						headers: {
							Accept: "application/json"
						}
					},
					function (error, response, body) {
						if (!error && response.statusCode == 200) {
							var product = JSON.parse(response.body);
							var productId = product.CatalogEntryView[0].DPCI;
							
							request(
								{
									uri: 'http://api.target.com/v2/products/availability?productId='+productId+'&storeId='+storeId+'&key=' + apiKey,
									headers: {
										Accept: "application/json"
									}
								},
								function (error, response, body) {
									if (!error && response.statusCode == 200) {
										var store = JSON.parse(response.body);
										var aisle = store.ProductAvailability.Product.Store.SalesFloorLocation.Aisle;
										player.scanSucceeded(upc, aisle);
									} else {
										player.scanFailed(upc, -3);
									}
								}
							);
						} else {
							player.scanFailed(upc, "Bad UPC");
						}
					}
				);
			} else {
				player.scanFailed(upc, -1);
			}
		}
	);
}
