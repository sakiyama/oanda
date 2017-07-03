'use strict'
var util = require('./util');
class transaction {
	constructor(data){
		data = util.removeSide(data);
		if(data.tradeOpened && data.tradeOpened.units){
			data.tradeOpened.units = data.units;
		}
		util.bind(this,{
			time : {
				type :  Date
			},
			expiry : {
				type :  Date
			},
			accountId : {
				name : "account"
			},
			orderId : {
				name : "order"
			},
			tradeId : {
				name : "trade"
			},
			takeProfitPrice : {
				name : "takeProfit"
			},
			stopLossPrice : {
				name : "stopLoss"
			},
			accountBalance : {
				name : "balance"
			},
		},data);
	}
}
module.exports = transaction;