var Upgrade = module.exports = function(name, cost, time) {
	return {
		name: name,
		cost: cost,
		time: time,
		dependents: [],
		dependencies: [],

		addDependent: function(dependent) {
			dependent.dependencies.push(this);
			this.dependents.push(dependent);
		},

		toJSON: function() {
			return {name: this.name, cost: this.cost, time: this.time};
		}
	};
};

var createStore = Upgrade("Build Store", 100, 0);
	var pharmacy = Upgrade("Pharmacy", 500, 0);
	var grocery = Upgrade("Grocery", 500, 0);
		var bakery = Upgrade("Bakery", 500, 0);
	var media = Upgrade("Media Center", 500, 0);
	var parking = Upgrade("Large Parking Lot", 500, 0);
		var bikeRack = Upgrade("Bike Rack", 500, 0);
		var moreParking = Upgrade("Larger Parking Lot", 500, 0);
			var valetService = Upgrade("Valet Service", 500, 0);
			var gas = Upgrade("Gas Station", 1000, 0);

	var aisles = Upgrade("More Aisles", 500, 0);
		var moreAisles = Upgrade("Even More Aisles", 500, 0);	
	var cashier = [Upgrade("Cashier", 500, 0)];
	for (var c = 1; c < 5; c++) {
		cashier[c] = Upgrade("Another Cashier", 500, 0);
		cashier[c-1].addDependent(cashier[c]);
	}
				var superTarget = Upgrade("Super Target", 500, 0);

module.exports.root = createStore;
	createStore.addDependent(pharmacy);
	createStore.addDependent(grocery);
		grocery.addDependent(bakery);
	createStore.addDependent(media);
	createStore.addDependent(parking);
		parking.addDependent(bikeRack);
		parking.addDependent(moreParking);
			moreParking.addDependent(valetService);
			moreParking.addDependent(gas);
	createStore.addDependent(aisles);
		aisles.addDependent(moreAisles);
	createStore.addDependent(cashier[0]);
				pharmacy.addDependent(superTarget);
				grocery.addDependent(superTarget);
				media.addDependent(superTarget);
				bikeRack.addDependent(superTarget);
				valetService.addDependent(superTarget);
				gas.addDependent(superTarget);
				moreAisles.addDependent(superTarget);
				cashier[4].addDependent(superTarget);
