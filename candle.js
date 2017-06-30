var util = require('./util');
var zeros = Math.pow(10, 7);
function middle(num1,num2){
	return ((num1*zeros + num2*zeros) / 2 / zeros);
}
class candle  {
	constructor(config){
		if(!config.complete){
			this.incomplete = true;
		}
		this.time = new Date(config.time/1000);
		["open","high","low","close"].forEach(function(name){
			this[name] = middle(config[name+'Bid'],config[name+'Ask']);
		},this);
		this.volume = config.volume;
	}
}
module.exports = candle;