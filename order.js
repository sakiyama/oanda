var util = require('./util');
class order {
	constructor(data){
		data = util.removeSide(data);
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