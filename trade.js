var util = require('./util');
class trade {
	constructor(data){
		data = util.removeSide(data);
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