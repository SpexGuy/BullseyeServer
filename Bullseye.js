var Player = require('./Player.js');

var players = {};

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
