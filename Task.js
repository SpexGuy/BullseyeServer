var Task = module.exports = function(name, cost, time, reward) {
	return {
		name: name,
		cost: cost,
		time: time,
		reward: reward,
	};
};

var tasks = [
	Task("Clean up puke", 1, 5000, 100),
	Task("Help at checkout", 1, 50000, 1000),
	Task("Kill the witnesses", 2, 10000, 500),
	Task("Kidnap customers", 3, 20000, 1500),
	Task("Fuck bitches", 1, 60000, 10000),
	Task("Order goods", 1, 5000, 2000),
	Task("Suck up to corporate", 2, 10000, 3000),
	Task("Sweep the floors", 3, 8000, 2000),
	Task("Pretend to work", 1, 7000, 500),
	Task("\"Welcome to GoodBurger, home of the GoodBurger\"", 2, 5000, 1000),
]

module.exports.pick = function() {
	return tasks[Math.floor(Math.random()*tasks.length)];
};
