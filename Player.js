var Upgrade = require('./Upgrade.js');
var millisPerDay = 1000*60*60*24;
var maxReward = 1000;

module.exports = function(username) {
	return {
		tasks: [],
		name: username,
		upgradesAvailable: [Upgrade.root],
		upgradesInProgress: [],
		upgradesUnlocked: [],
		money: 1000,
		lastUpdateTime: Date.now(),
		moneyPerDay: 10,
		scans: [],
		scanUpdates: [],

		ping: function() {
			var time = Date.now();
			var dt = time - this.lastUpdateTime;

			var updates = {
				money: this.pingMoney(dt),
				upgrades: this.pingUpgrades(dt),
				scans: this.scanUpdates,
			}

			this.scanUpdates = [];
			this.lastUpdateTime = time;
			return updates;
		},

		pingUpgrades: function(dt) {
			var changes = this.changes = {unlocks: [], available: []};
			for (var c = 0; c < this.upgradesInProgress.length; c++) {
				this.upgradesInProgress[c][0] -= dt;
				if (this.upgradesInProgress[c][0] <= 0) {
					this.unlockUpgrade(this.upgradesInProgress[c][1]);
					this.upgradesInProgress.splice(c, 1);
					c--;
				}
			}
			delete this.changes;
			return changes;
		},
		unlockUpgrade: function(upgrade) {
			this.upgradesUnlocked.push(upgrade);
			this.changes.unlocks.push(upgrade);
			for (var c = 0; c < upgrade.dependents.length; c++) {
				if (this.hasPrerequisites(upgrade.dependents[c])) {
					this.upgradesAvailable.push(upgrade.dependents[c]);
					this.changes.available.push(upgrade.dependents[c]);
				}
			}
		},
		hasPrerequisites: function(upgrade) {
			for (var c = 0; c < upgrade.dependencies.length; c++) {
				if (this.upgradesUnlocked.indexOf(upgrade.dependencies[c]) <= -1) {
					return false;
				}
			}
			return true;
		},

		getUpgrades: function() {
			return {
				available: this.upgradesAvailable,
				unlocked: this.upgradesUnlocked,
				inProgress: this.upgradesInProgress
			};
		},

		pingMoney: function(dt) {
			this.money += dt * this.moneyPerDay / millisPerDay;
			return this.money;
		},

		startUpgrade: function(index) {
			var upgrade = this.upgradesAvailable[index];
			if (!upgrade) return "No such index!";
			if (upgrade.cost > this.money) return "Not enough money!";
			this.money -= upgrade.cost;
			this.upgradesAvailable.splice(index, 1);
			this.upgradesInProgress.push([upgrade.time, upgrade]);
			return true;
		},

		scanSucceeded: function(upc, aisle) {
			var time = Date.now();
			var lastScan = this.scans[aisle];
			if (!lastScan) {
				lastScan = this.scans[aisle] = [time];
				this.money += maxReward;
				this.scanUpdates.push([upc, maxReward]);
			} else {
				var dt = time - lastScan[0];
				lastScan[0] = time;
				var reward = Math.min(this.getReward(dt), maxReward);
				this.money += reward;
				this.scanUpdates.push([upc, reward]);
			}
		},
		getReward: function(dt) {
			return (dt/1000);
		},

		scanFailed: function(upc, error) {
			this.scanUpdates.push([upc, error]);
		},
	};
};
