var util = require('./util');
class transaction {
	constructor(data){
		util.bind(this,{
			time : {
				type :  Date
			},
			expiry : {
				type :  Date
			},
			accountId : {
				remove : true
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
		},data);
	}
}
module.exports = transaction;