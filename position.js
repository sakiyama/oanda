var util = require('./util');
class position {
	constructor(data){
		data = util.removeSide(data);
		util.bind(this,{
		},data);
	}
}
module.exports = position;