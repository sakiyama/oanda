var util = require('./util');

class account {
	constructor(data){
		util.bind(this,{
			accountId : {
				name : 'id'
			},
			accountName : {
				name : 'name'
			},
			openTrades : {
				remove : true
			},
			openOrders : {
				remove :  true
			},
			accountCurrency : {
				name :  'currency'
			},
		},data);
	}
}
module.exports = account;