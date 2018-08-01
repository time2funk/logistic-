const Truck = class {
    constructor() {
    	console.log("Truck constructor");
        this.truckID = this.makeid();
        this.load = [];
        this.weight_available = 1000;
    }
    push(item) {
    	console.log("Truck push");
        if (this.weight_available >= item.weight) {
            this.load.push(item);
            this.weight_available -= item.weight;
            // return true;
        } 
        // else return false;
    }
    getWeight() {
    	console.log("Truck getWeight");
        return this.weight_available;
    }
    getLoad() {
    	console.log("Truck getLoad");
        return {
            "truckID": this.truckID,
            "load": this.load
        }
    }
	// function to make unique truck ID
	makeid(length) {
	    var id = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    if (!length) length = 6

	    for (var i = 0; i < length; i++)
	        id += possible.charAt(Math.floor(Math.random() * possible.length));

	    return id;
	}
};

const Handler = class {
    constructor(packages) {
    	console.log("Handler constructor");
        // sort array by weight
        this.arr = packages.sort((a, b) => {
            return a.weight < b.weight;
        });
    	console.log(this.arr);
    }
    output() {
    	console.log("Handler output");
        // check the packages length and weight
        if (this.arr.length == 0)
            return {
                error: "wrong input"
            };
        this.arr.forEach(item => {
            if (item.weight > 500)
                return {
                    error: "wrong input"
                };
        });

        // the magic =)
        let trucks = [];
        let price = 0;

        for (var i = 0; i < this.arr.length; i++) {
        	console.log('iteration', i);
            let item = this.arr[i];
        	console.log('package', item);

            // calc price fo the item
            if(item.weight <= 400){
            	price += 0.01 * item.weight;
            }else{
            	price += 2 + 0.005 * item.weight;
            }

            // first truck create
            if (trucks.length == 0) {
                trucks.push(new Truck());
            }

            for (var j = 0; j < trucks.length; j++) {
                let truck = trucks[j];

                if (truck.getWeight() >= item.weight ){
                	truck.push(item);
                	break;
                }
                // need to create new truck and push item to it
                else if(j == trucks.length-1 ){
                	let tmp_truck = new Truck();
                	tmp_truck.push(item);
                	trucks.push(tmp_truck);
                	break;
                }
            }
        }
        return {
        	"price": price,
        	"trucks": trucks.map( item => item.getLoad() )
        };
    }
};


module.exports = Handler;
/*
	{
	  "price": 10.95,
	  "trucks": [
	    {
	      "truckID": "unique truck ID",
	      "load": [
	        { "id": "ID-1", "weight": 345 },
	        { "id": "OTHER-ID-2", "weight": 500 }
	      ]
	    },
	    {
	      "truckID": "other unique truck ID",
	      "load": [
	        { "id": "CLIENT-ID-3", "weight": 300 }
	      ]
	    }
	  ]
	}
*/