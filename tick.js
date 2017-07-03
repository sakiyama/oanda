'use strict'
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
	}
	mid(){
		return middle(this.ask,this.bid);
	}
	spread(){
		return ((this.ask*zeros - this.bid*zeros) / zeros);
	}
}
module.exports = tick;