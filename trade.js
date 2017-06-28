var util = require('./util');
class trade {
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
			}
		},data);
	}
}
module.exports = trade;