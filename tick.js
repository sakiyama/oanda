var util = require('./util');
var zeros = Math.pow(10, 7);
function middle(num1,num2){
	return ((num1*zeros + num2*zeros) / 2 / zeros);
}
class tick  {
	constructor(data){
		util.bind(this,{
			time : {
				type :  Date
			},
		},data);
		this.mid = middle(this.ask,this.bid);
	}
}
module.exports = tick;