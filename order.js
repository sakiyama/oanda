var util = require('./util');
class order {
	constructor(data){
		if(data.side == 'sell'){
			data.units *= -1;
		}
		util.bind(this,{
			side : {
				remove :  true
			},
			time : {
				type :  Date
			},
			expiry : {
				type :  Date
			},
		},data);
	}
}
module.exports = order;